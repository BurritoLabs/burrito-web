import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

type LatestOk = { ok: true; height: number; hash: string };

type BlockOk = {
  ok: true;
  chain_id: string;
  height: number;
  time: string;
  txs: number;
  proposer: string; // base64 (lcd) or string (fcd) - only used as fallback display
  proposer_valcons?: string;
  proposer_valoper?: string;
  proposer_moniker?: string;
};

type Bad = { ok: false; error: string };

// --------------------
// LCD helpers (fallback)
// --------------------
let stakingCache: { ts: number; vals: any[] } | null = null;
const pubKeyMap = new Map<string, { ts: number; valoper: string; moniker: string }>();

const STAKING_TTL_MS = 60 * 1000;      // 60s
const PUBKEY_TTL_MS = 10 * 60 * 1000;  // 10min

function now() { return Date.now(); }

async function getStakingValidators(LCD: string): Promise<any[]> {
  const t = now();
  if (stakingCache && t - stakingCache.ts < STAKING_TTL_MS) return stakingCache.vals;

  const r = await fetch(`${LCD}/cosmos/staking/v1beta1/validators?pagination.limit=300`, { cache: "no-store" });
  if (!r.ok) return stakingCache?.vals ?? [];
  const j = await r.json();
  const vals = Array.isArray(j?.validators) ? j.validators : [];
  stakingCache = { ts: t, vals };
  return vals;
}

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

const BECH32_ALPHABET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l";
function bech32Polymod(values: number[]): number {
  const GEN = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  let chk = 1;
  for (const v of values) {
    const top = chk >>> 25;
    chk = ((chk & 0x1ffffff) << 5) ^ v;
    for (let i = 0; i < 5; i++) if (((top >>> i) & 1) === 1) chk ^= GEN[i];
  }
  return chk;
}
function bech32HrpExpand(hrp: string): number[] {
  const ret: number[] = [];
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) >>> 5);
  ret.push(0);
  for (let i = 0; i < hrp.length; i++) ret.push(hrp.charCodeAt(i) & 31);
  return ret;
}
function bech32CreateChecksum(hrp: string, data: number[]): number[] {
  const values = bech32HrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
  const mod = bech32Polymod(values) ^ 1;
  const ret: number[] = [];
  for (let p = 0; p < 6; p++) ret.push((mod >>> (5 * (5 - p))) & 31);
  return ret;
}
function convertBits(data: Uint8Array, from: number, to: number, pad: boolean): number[] {
  let acc = 0;
  let bits = 0;
  const ret: number[] = [];
  const maxv = (1 << to) - 1;
  for (let i = 0; i < data.length; i++) {
    const value = data[i];
    if (value < 0 || (value >> from) !== 0) return [];
    acc = (acc << from) | value;
    bits += from;
    while (bits >= to) {
      bits -= to;
      ret.push((acc >> bits) & maxv);
    }
  }
  if (pad) {
    if (bits > 0) ret.push((acc << (to - bits)) & maxv);
  } else {
    if (bits >= from) return [];
    if (((acc << (to - bits)) & maxv) !== 0) return [];
  }
  return ret;
}
function bech32Encode(hrp: string, data8: Uint8Array): string {
  const data5 = convertBits(data8, 8, 5, true);
  const checksum = bech32CreateChecksum(hrp, data5);
  const combined = data5.concat(checksum);
  let out = hrp + "1";
  for (const v of combined) out += BECH32_ALPHABET[v];
  return out;
}

async function fetchBlockFromLCD(LCD: string, h: number): Promise<BlockOk | Bad> {
  const r = await fetch(`${LCD}/cosmos/base/tendermint/v1beta1/blocks/${h}`, { cache: "no-store" });
  if (!r.ok) return { ok: false, error: `lcd http ${r.status}` };

  const j = await r.json();
  const chain_id = j?.block?.header?.chain_id ?? "";
  const height2 = Number(j?.block?.header?.height ?? h);
  const time = j?.block?.header?.time ?? "";
  const txs = Array.isArray(j?.block?.data?.txs) ? j.block.data.txs.length : 0;

  const proposer = j?.block?.header?.proposer_address ?? ""; // base64
  const proposer_valcons = proposer ? bech32Encode("terravalcons", b64ToBytes(proposer)) : undefined;

  let proposer_valoper: string | undefined;
  let proposer_moniker: string | undefined;

  if (proposer_valcons) {
    const vs = await fetch(`${LCD}/cosmos/base/tendermint/v1beta1/validatorsets/${h}?pagination.limit=300`, { cache: "no-store" });
    if (vs.ok) {
      const vj = await vs.json();
      const list = Array.isArray(vj?.validators) ? vj.validators : [];
      const hit = list.find((x: any) => x?.address === proposer_valcons);
      const hitKey = hit?.pub_key?.key as string | undefined;

      if (hitKey) {
        const t = now();
        const cached = pubKeyMap.get(hitKey);
        if (cached && t - cached.ts < PUBKEY_TTL_MS) {
          proposer_valoper = cached.valoper;
          proposer_moniker = cached.moniker;
        } else {
          const vals = await getStakingValidators(LCD);
          const m = vals.find((v: any) => v?.consensus_pubkey?.key === hitKey);
          if (m?.operator_address) {
            const valoper = m.operator_address as string;
            const moniker = (m?.description?.moniker ?? "") as string;
            proposer_valoper = valoper;
            proposer_moniker = moniker;
            pubKeyMap.set(hitKey, { ts: t, valoper, moniker });
          }
        }
      }
    }
  }

  return {
    ok: true,
    chain_id,
    height: height2,
    time,
    txs,
    proposer,
    proposer_valcons,
    proposer_valoper,
    proposer_moniker
  };
}

// --------------------
// FCD (primary)
// --------------------
async function fetchBlockFromFCD(FCD: string, h: number): Promise<BlockOk | null> {
  const r = await fetch(`${FCD}/v1/blocks/${h}`, { cache: "no-store" });
  if (!r.ok) return null;

  const j: any = await r.json();

  // FCD shapes vary slightly; try best-effort normalize
  const chain_id = j?.chainId ?? j?.chain_id ?? j?.block?.chainId ?? "columbus-5";
  const height = Number(j?.height ?? j?.block?.height ?? h);
  const time = j?.timestamp ?? j?.time ?? j?.block?.timestamp ?? j?.block?.time ?? "";
  const txs = Number(j?.txs?.length ?? j?.tx_count ?? j?.txs ?? j?.transactions ?? 0);

  const proposer_valoper =
    j?.proposer?.operatorAddress ??
    j?.proposer?.operator_address ??
    j?.proposer?.validator ??
    j?.proposer_address ??
    j?.proposer ??
    undefined;

  const proposer_moniker =
    j?.proposer?.moniker ??
    j?.proposer?.name ??
    j?.proposer_name ??
    j?.validator?.moniker ??
    undefined;

  // proposer raw fallback display
  const proposer = (proposer_valoper || proposer_moniker || "") as string;

  return {
    ok: true,
    chain_id: String(chain_id || ""),
    height,
    time: String(time || ""),
    txs: Number.isFinite(txs) ? txs : 0,
    proposer,
    proposer_valoper: proposer_valoper ? String(proposer_valoper) : undefined,
    proposer_moniker: proposer_moniker ? String(proposer_moniker) : undefined
  };
}

async function fetchLatestFromFCD(FCD: string): Promise<LatestOk | null> {
  const r = await fetch(`${FCD}/v1/blocks/latest`, { cache: "no-store" });
  if (!r.ok) return null;
  const j: any = await r.json();
  const height = Number(j?.height ?? j?.block?.height ?? 0);
  const hash = String(j?.hash ?? j?.block_id?.hash ?? j?.block?.hash ?? "");
  if (!height) return null;
  return { ok: true, height, hash };
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const heightQ = url.searchParams.get("height");

    const LCD = process.env.TERRA_LCD || "https://terra-classic-lcd.publicnode.com";
    const FCD = process.env.TERRA_FCD || "https://terra-classic-fcd.publicnode.com";

    // Block mode
    if (heightQ) {
      const h = Number(heightQ);
      if (!Number.isFinite(h) || h <= 0) {
        return NextResponse.json({ ok: false, error: "invalid height" } satisfies Bad, { status: 400 });
      }

      // 1) FCD first (fast)
      try {
        const fcd = await fetchBlockFromFCD(FCD, h);
        if (fcd) return NextResponse.json(fcd);
      } catch {}

      // 2) fallback LCD
      const lcd = await fetchBlockFromLCD(LCD, h);
      if (!lcd.ok) return NextResponse.json(lcd satisfies Bad, { status: 502 });
      return NextResponse.json(lcd);
    }

    // Latest (Dial): FCD first
    try {
      const f = await fetchLatestFromFCD(FCD);
      if (f) return NextResponse.json(f);
    } catch {}

    // fallback LCD latest
    const rr = await fetch(`${LCD}/blocks/latest`, { cache: "no-store" });
    if (!rr.ok) {
      return NextResponse.json({ ok: false, error: `lcd http ${rr.status}` } satisfies Bad, { status: 502 });
    }

    const jj: any = await rr.json();
    const height = Number(jj?.block?.header?.height ?? 0);
    const hash = jj?.block_id?.hash ?? "";

    const out: LatestOk = { ok: true, height, hash };
    return NextResponse.json(out);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown error" } satisfies Bad, { status: 500 });
  }
}

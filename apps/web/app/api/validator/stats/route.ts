import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Ok = {
  ok: true;
  staked?: number;
  votingPower?: number;
  commission?: number;
  delegators?: number;
};

type Bad = { ok: false; error: string };

type TerraValidator = {
  operator_address?: string;
  tokens?: string;
  commission?: { commission_rates?: { rate?: string } };
};

type DelegationResponse = {
  delegation?: { delegator_address?: string };
  balance?: { amount?: string };
};

type Cached = { ts: number; data: Ok };
const CACHE_TTL_MS = 5 * 60 * 1000;
const statsCache = new Map<string, Cached>();

async function fetchDelegatorCount(LCD: string, valoper: string) {
  const totals = new Map<string, bigint>();
  const minAmount = 1n; // 0.000001 LUNC (1 uluna)
  let key: string | undefined;
  let pages = 0;

  while (true) {
    const keyQ = key ? `&pagination.key=${encodeURIComponent(key)}` : "";
    const url = `${LCD}/cosmos/staking/v1beta1/validators/${valoper}/delegations?pagination.limit=200${keyQ}`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) break;
    const j: any = await r.json();

    const list = (j?.delegation_responses ?? []) as DelegationResponse[];
    for (const item of list) {
      const addr = item?.delegation?.delegator_address;
      const amount = item?.balance?.amount;
      if (!addr || !amount) continue;
      try {
        const value = BigInt(amount);
        totals.set(addr, (totals.get(addr) ?? 0n) + value);
      } catch {
        // ignore invalid amounts
      }
    }

    key = j?.pagination?.next_key ?? undefined;
    pages += 1;
    if (!key || pages > 200) break;
  }

  let count = 0;
  for (const v of totals.values()) {
    if (v >= minAmount) count += 1;
  }
  return count || undefined;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const valoper = url.searchParams.get("valoper");
    if (!valoper) {
      return NextResponse.json(
        { ok: false, error: "missing valoper" } satisfies Bad,
        { status: 400 }
      );
    }

    const cached = statsCache.get(valoper);
    const now = Date.now();
    if (cached && now - cached.ts < CACHE_TTL_MS) {
      return NextResponse.json(cached.data);
    }

    const LCD =
      process.env.TERRA_LCD || "https://terra-classic-lcd.publicnode.com";

    const vRes = await fetch(
      `${LCD}/cosmos/staking/v1beta1/validators/${valoper}`,
      { cache: "no-store" }
    );
    if (!vRes.ok) {
      return NextResponse.json(
        { ok: false, error: `validator http ${vRes.status}` } satisfies Bad,
        { status: 502 }
      );
    }
    const vj: any = await vRes.json();
    const validator = (vj?.validator ?? vj) as TerraValidator;

    const poolRes = await fetch(`${LCD}/cosmos/staking/v1beta1/pool`, {
      cache: "no-store",
    });
    if (!poolRes.ok) {
      return NextResponse.json(
        { ok: false, error: `pool http ${poolRes.status}` } satisfies Bad,
        { status: 502 }
      );
    }

    let bondedTokens = 0;
    if (poolRes.ok) {
      const pj: any = await poolRes.json();
      bondedTokens = Number(pj?.pool?.bonded_tokens ?? 0);
    }

    const tokens = Number(validator.tokens || 0);
    const staked = Number.isFinite(tokens) ? tokens / 1_000_000 : undefined;

    const commissionRate = validator.commission?.commission_rates?.rate;
    const commission =
      commissionRate != null
        ? Number(commissionRate) * 100
        : undefined;

    const votingPower =
      bondedTokens > 0 && Number.isFinite(tokens)
        ? (tokens / bondedTokens) * 100
        : undefined;

    let delegators: number | undefined;
    try {
      delegators = await fetchDelegatorCount(LCD, valoper);
    } catch {}

    const data: Ok = {
      ok: true,
      staked,
      votingPower,
      commission,
      delegators,
    };

    statsCache.set(valoper, { ts: now, data });
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "unknown error" } satisfies Bad,
      { status: 500 }
    );
  }
}

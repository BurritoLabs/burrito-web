import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "edge";

type ChainKey = "lunc" | "luna";

type ChainConfig = {
  key: ChainKey;
  chainId: "columbus-5" | "phoenix-1";
  lcd: string;
};

const chainConfigs: Record<ChainKey, ChainConfig> = {
  lunc: {
    key: "lunc",
    chainId: "columbus-5",
    lcd: process.env.TERRA_CLASSIC_LCD || process.env.TERRA_LCD || "https://terra-classic-lcd.publicnode.com",
  },
  luna: {
    key: "luna",
    chainId: "phoenix-1",
    lcd: process.env.TERRA_LUNA_LCD || "https://terra-lcd.publicnode.com",
  },
};

type BlockPayload = {
  block?: {
    header?: {
      chain_id?: string;
      height?: string;
      time?: string;
    };
    data?: { txs?: unknown[] };
  };
  block_id?: { hash?: string };
};

async function fetchBlock(config: ChainConfig, height?: number) {
  const suffix = height ? String(height) : "latest";
  const response = await fetch(
    `${config.lcd}/cosmos/base/tendermint/v1beta1/blocks/${suffix}`,
    { cache: "no-store" },
  );

  if (!response.ok) throw new Error(`lcd http ${response.status}`);
  const payload = (await response.json()) as BlockPayload;
  const blockHeight = Number(payload.block?.header?.height ?? 0);

  if (!blockHeight) throw new Error("block height unavailable");

  return {
    ok: true as const,
    chain: config.key,
    chainId: payload.block?.header?.chain_id || config.chainId,
    height: blockHeight,
    hash: payload.block_id?.hash || "",
    time: payload.block?.header?.time || "",
    txs: Array.isArray(payload.block?.data?.txs) ? payload.block.data.txs.length : 0,
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const chainParam = url.searchParams.get("chain");
  const chain: ChainKey = chainParam === "luna" ? "luna" : "lunc";
  const heightParam = url.searchParams.get("height");

  try {
    if (heightParam) {
      const height = Number(heightParam);
      if (!Number.isInteger(height) || height <= 0) {
        return NextResponse.json({ ok: false, error: "invalid height" }, { status: 400 });
      }
      return NextResponse.json(await fetchBlock(chainConfigs[chain], height));
    }

    return NextResponse.json(await fetchBlock(chainConfigs[chain]));
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return NextResponse.json({ ok: false, chain, error: message }, { status: 502 });
  }
}

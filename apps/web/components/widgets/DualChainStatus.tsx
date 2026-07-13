"use client";

import { useEffect, useState } from "react";

type ChainKey = "lunc" | "luna";
type Heights = Record<ChainKey, number | null>;

type LatestResponse =
  | { ok: true; height: number }
  | { ok: false; error: string };

const chains = [
  {
    key: "lunc" as const,
    name: "Terra Classic",
    symbol: "LUNC",
    chainId: "columbus-5",
    finder: "classic",
    className: "statusLunc",
  },
  {
    key: "luna" as const,
    name: "Terra",
    symbol: "LUNA",
    chainId: "phoenix-1",
    finder: "mainnet",
    className: "statusLuna",
  },
] as const;

const formatter = new Intl.NumberFormat("en-US");

export default function DualChainStatus() {
  const [heights, setHeights] = useState<Heights>({ lunc: null, luna: null });

  useEffect(() => {
    let active = true;

    const load = async () => {
      const entries = await Promise.all(
        chains.map(async (chain) => {
          try {
            const response = await fetch(`/api/chain/latest?chain=${chain.key}`, {
              cache: "no-store",
            });
            const data = (await response.json()) as LatestResponse;
            return [chain.key, data.ok ? data.height : null] as const;
          } catch {
            return [chain.key, null] as const;
          }
        }),
      );

      if (active) setHeights(Object.fromEntries(entries) as Heights);
    };

    load();
    const timer = window.setInterval(load, 6000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="dualStatus" aria-label="Live Terra network status">
      <div className="dualStatusHeader">
        <span>Network pulse</span>
        <span className="liveLabel">
          <span className="liveDot" aria-hidden="true" />
          Live
        </span>
      </div>

      <div className="chainStatusList">
        {chains.map((chain) => {
          const height = heights[chain.key];
          const href = height
            ? `https://finder.burrito.money/${chain.finder}/blocks/${height}`
            : `https://finder.burrito.money/${chain.finder}`;

          return (
            <a className={`chainStatus ${chain.className}`} href={href} key={chain.key}>
              <div className="chainStatusIdentity">
                <span className="statusMark" aria-hidden="true" />
                <div>
                  <strong>{chain.name}</strong>
                  <span>{chain.chainId}</span>
                </div>
              </div>
              <div className="chainStatusHeight">
                <span>{height ? formatter.format(height) : "Connecting"}</span>
                <small>Latest block</small>
              </div>
              <span className="chainStatusSymbol">{chain.symbol}</span>
            </a>
          );
        })}
      </div>

      <div className="dualStatusFooter">
        <span>Two Burrito validators</span>
        <a href="https://monitor.burrito.money">Open Monitor</a>
      </div>
    </div>
  );
}

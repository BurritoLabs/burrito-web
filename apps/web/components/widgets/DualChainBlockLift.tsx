"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DualChainBlockLift.module.css";

type Network = "phoenix" | "classic";

type LatestResponse =
  | { ok: true; chain_id: string; height: number; hash: string }
  | { ok: false; error: string };

type LiveHeight = {
  height: number | null;
  sequence: number;
};

const NETWORKS = {
  phoenix: { name: "Terra", chainId: "Phoenix-1", finder: "mainnet" },
  classic: { name: "Terra Classic", chainId: "Columbus-5", finder: "classic" },
} as const;

function useLiveHeight(network: Network): LiveHeight {
  const [live, setLive] = useState<LiveHeight>({ height: null, sequence: 0 });
  const lastHeight = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    let inFlight = false;

    const tick = async () => {
      if (!active || inFlight || document.visibilityState === "hidden") return;
      inFlight = true;

      try {
        const response = await fetch(`/api/chain/latest?network=${network}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as LatestResponse;
        if (!active || !payload.ok || payload.height === lastHeight.current) return;

        const firstHeight = lastHeight.current === null;
        lastHeight.current = payload.height;
        setLive((current) => ({
          height: payload.height,
          sequence: firstHeight ? current.sequence : current.sequence + 1,
        }));
      } catch {
        // Keep the last confirmed height through temporary endpoint failures.
      } finally {
        inFlight = false;
      }
    };

    void tick();
    const timer = window.setInterval(tick, 2400);
    const onVisibilityChange = () => void tick();
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [network]);

  return live;
}

function NetworkDial({ network, live }: { network: Network; live: LiveHeight }) {
  const config = NETWORKS[network];
  const motionPhase = live.sequence % 2 === 0 ? "A" : "B";
  const heights = live.height === null
    ? Array.from({ length: 5 }, () => null)
    : [live.height + 2, live.height + 1, live.height, live.height - 1, live.height - 2];

  return (
    <section
      className={`${styles.networkDial} ${styles[network]}`}
      aria-label={`${config.name} ${config.chainId} live blocks`}
    >
      <div className={styles.networkLabel}>
        <span className={styles.liveDot} aria-hidden="true" />
        <span className={styles.networkName}>{config.name}</span>
        <span className={styles.chainId}>{config.chainId}</span>
      </div>

      <div className={styles.dialWindow}>
        <div className={styles.dialTrack}>
          {heights.map((height, index) => {
            const motionClass = live.sequence === 0 || height === null
              ? ""
              : index === 0
                ? styles[`enter${motionPhase}`]
                : styles[`shift${motionPhase}`];
            const slotClassName = [
              styles.blockSlot,
              styles[`slot${index}`],
              motionClass,
            ].filter(Boolean).join(" ");
            return (
              <div className={slotClassName} key={height ?? `loading-${index}`}>
                {height !== null && index >= 2 ? (
                  <a
                    className={styles.blockPill}
                    href={`https://finder.burrito.money/${config.finder}/blocks/${height}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${config.name} block ${height}`}
                  >
                    {height.toLocaleString("en-US")}
                  </a>
                ) : (
                  <div
                    className={`${styles.blockPill} ${height === null ? styles.loading : ""}`}
                    aria-hidden="true"
                  >
                    {height === null ? "" : height.toLocaleString("en-US")}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={[
            styles.currentBezel,
            live.sequence > 0 ? styles[`bezelPulse${motionPhase}`] : "",
          ].filter(Boolean).join(" ")}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

export default function DualChainBlockLift() {
  const phoenix = useLiveHeight("phoenix");
  const classic = useLiveHeight("classic");

  return (
    <div className={styles.visual} aria-label="Live blocks across two Terra networks">
      <div className={`${styles.networkGlow} ${styles.phoenixGlow}`} aria-hidden="true" />
      <div className={`${styles.networkGlow} ${styles.classicGlow}`} aria-hidden="true" />
      <NetworkDial network="phoenix" live={phoenix} />
      <NetworkDial network="classic" live={classic} />
    </div>
  );
}

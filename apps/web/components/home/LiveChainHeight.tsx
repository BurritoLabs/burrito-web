"use client";

import { useEffect, useState } from "react";

type Network = "phoenix" | "classic";

type LatestResponse =
  | { ok: true; chain_id: string; height: number }
  | { ok: false; error: string };

export default function LiveChainHeight({ network }: { network: Network }) {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    const update = async () => {
      try {
        const response = await fetch(`/api/chain/latest?network=${network}`, {
          cache: "no-store",
        });
        const data = (await response.json()) as LatestResponse;
        if (alive && data.ok) setHeight(data.height);
      } catch {
        // Preserve the last confirmed height during transient provider failures.
      }
    };

    update();
    const timer = setInterval(update, 6000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, [network]);

  return (
    <span aria-live="polite">
      {height === null
        ? "Connecting..."
        : new Intl.NumberFormat("en-US").format(height)}
    </span>
  );
}

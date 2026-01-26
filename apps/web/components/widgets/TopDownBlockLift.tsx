"use client";

import { useEffect, useRef, useState } from "react";

type LatestResp =
  | { ok: true; height: number; hash: string }
  | { ok: false; error: string };

export default function TopDownBlockLift() {
  const [height, setHeight] = useState<number | null>(null);
  const [stepKey, setStepKey] = useState(0);
  const lastHeight = useRef<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const tick = async () => {
      try {
        const r = await fetch("/api/chain/latest", { cache: "no-store" });
        const j = (await r.json()) as LatestResp;
        if (!j.ok) return;

        const h = j.height;

        if (lastHeight.current == null) {
          lastHeight.current = h;
          setHeight(h);
          return;
        }

        if (h !== lastHeight.current) {
          lastHeight.current = h;
          setHeight(h);
          setStepKey((k) => k + 1);
        }
      } catch {
        // ignore transient network errors
      }
    };

    tick();
    timer = setInterval(tick, 1200);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  if (height == null) return null;

  const fmt = (n: number) => n.toLocaleString();
  const values = [height + 2, height + 1, height, height - 1, height - 2];

  return (
    <div className="bdDialWrap" aria-label="Live block dial">
      <div key={stepKey} className="bdDialTrack">
        {values.map((h, i) => {
          const clickable = i >= 2; // only 3/4/5
          const cls = `bdPill p${i} ${clickable ? "isClick" : "noClick"}`;

          return clickable ? (
            <a
              key={h}
              href={`https://finder.burrito.money/classic/blocks/${h}`}
              target="_blank"
              rel="noreferrer"
              className={cls}
              aria-label={`Open block ${h}`}
            >
              {fmt(h)}
            </a>
          ) : (
            <div key={h} className={cls} aria-hidden="true">
              {fmt(h)}
            </div>
          );
        })}
      </div>

      <div className="bdBezel" aria-hidden="true" />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

type NodeStatsResp =
  | {
      ok: true;
      staked?: number;
      votingPower?: number;
      commission?: number;
      delegators?: number;
    }
  | { ok: false; error: string };

type Stat = { label: string; value: string };

const fmtNum = (n: number, max = 2) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: max,
  }).format(n);

const fmtBillions = (n: number) => {
  const b = n / 1_000_000_000;
  return `${fmtNum(b, 2)}B`;
};

export default function NodeStats({ valoper }: { valoper: string }) {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Total Staked", value: "— LUNC" },
    { label: "Voting Power", value: "—%" },
    { label: "Commission", value: "—%" },
    { label: "Delegators", value: "—" },
  ]);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const r = await fetch(`/api/validator/stats?valoper=${valoper}`, {
          cache: "no-store",
        });
        const j = (await r.json()) as NodeStatsResp;
        if (!alive) return;
        if (!j.ok) return;

        const next: Stat[] = [
          {
            label: "Total Staked",
            value:
              typeof j.staked === "number"
                ? `${fmtBillions(j.staked)} LUNC`
                : "— LUNC",
          },
          {
            label: "Voting Power",
            value:
              typeof j.votingPower === "number"
                ? `${fmtNum(j.votingPower, 2)}%`
                : "—%",
          },
          {
            label: "Commission",
            value:
              typeof j.commission === "number"
                ? `${fmtNum(j.commission, 2)}%`
                : "—%",
          },
          {
            label: "Delegators",
            value:
              typeof j.delegators === "number"
                ? `${fmtNum(j.delegators, 0)}`
                : "—",
          },
        ];
        setStats(next);
      } catch {
        // ignore transient errors
      }
    };

    run();
    const t = setInterval(run, 60000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, [valoper]);

  return (
    <>
      {stats.map((x) => (
        <div key={x.label} className="menuCard nodeCard">
          <div className="nodeLabel">{x.label}</div>
          <div className="nodeValue">{x.value}</div>
        </div>
      ))}
    </>
  );
}

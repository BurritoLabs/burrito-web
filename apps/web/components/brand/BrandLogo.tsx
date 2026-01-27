import React from "react";

export default function BrandLogo({
  textSize = 20,
  iconSize = 24,
  gap = 8,
}: {
  textSize?: number;
  iconSize?: number;
  gap?: number;
}) {
  return (
    <span
      aria-label="Burrito"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap,
        paddingLeft: gap, // ✅ 左侧留白 = icon↔text 间距（Phoenix 风格）
        lineHeight: 1,
      }}
    >
      <img
        src="/brand/icon.png"
        alt="Burrito"
        loading="lazy"
        fetchPriority="low"
        decoding="async"
        style={{
          height: iconSize,
          width: "auto",
          display: "block",
        }}
      />

      <span
        style={{
          fontSize: textSize,
          fontWeight: 650,
          letterSpacing: "-0.05em",
          color: "#FFFFFF",
          lineHeight: "1em",
          display: "block",
          fontFamily:
            "var(--font-montserrat), Montserrat, Inter, system-ui, sans-serif",
        }}
      >
        Burrito
      </span>
    </span>
  );
}

import React from "react";

type Props = {
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  /** 只有 Header 需要：右侧留白 */
  marginRight?: number;
  /** ✅ 只让 Hero 变大（不影响其他地方） */
  size?: "normal" | "large";
  children?: React.ReactNode;
};

export default function LaunchButton({
  href = "https://app.burrito.money",
  className = "btnPrimary hdrCta",
  style,
  marginRight,
  size = "normal",
  children = "Launch App",
}: Props) {
  // ✅ 皮肤（外观）保持不变
  const skinStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    letterSpacing: "0",
    lineHeight: 1,
    textDecoration: "none",
    background: "#52C41A",
    color: "#0C1411",
    boxShadow: "0 6px 14px rgba(0,0,0,0.16)",
    whiteSpace: "nowrap",
    fontFamily: '"Nunito Sans", Inter, system-ui, sans-serif',
  };

  // ✅ 尺寸（只改大小）
  const sizeStyle: React.CSSProperties =
    size === "large"
      ? {
          height: 40,          // ← Dial 胶囊级别（要更大就 52）
          padding: "0px 22px",
          fontSize: 12,
          fontWeight: 700,
        }
      : {
          height: 36,
          padding: "0px 20px",
          fontSize: 12,
          fontWeight: 700,
        };

  return (
    <a
      className={className}
      href={href}
      style={{
        ...skinStyle,
        ...sizeStyle,
        ...(typeof marginRight === "number" ? { marginRight } : null),
        ...style,
      }}
    >
      {children}
    </a>
  );
}




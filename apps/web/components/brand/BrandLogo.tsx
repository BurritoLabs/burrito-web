import Image from "next/image";

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
        paddingLeft: gap,
        lineHeight: 1,
      }}
    >
      <Image
        src="/brand/icon.png"
        alt="Burrito"
        width={iconSize}
        height={iconSize}
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
          letterSpacing: "0",
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

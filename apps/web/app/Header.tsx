"use client";

import { useEffect, useRef, useState } from "react";
import BrandLogo from "../components/brand/BrandLogo";
import LaunchButton from "../components/buttons/LaunchButton";

const H = 56;

export default function Header() {
  const [show, setShow] = useState(true);
  const [atTop, setAtTop] = useState(true);

  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY || 0;
    setAtTop(lastY.current <= 2);

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - lastY.current;

        const isTop = y <= 2;
        setAtTop(isTop);

        if (isTop) {
          setShow(true);
        } else {
          if (dy < -6) setShow(true); // 向上滚动 -> 显示
          if (dy > 6) setShow(false); // 向下滚动 -> 隐藏
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        aria-label="Site header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: H,
          zIndex: 9999,

          transform: show ? "translateY(0)" : `translateY(-${H + 2}px)`,
          transition: "transform 220ms ease, background-color 220ms ease, box-shadow 260ms ease",

          backgroundColor: atTop ? "transparent" : "var(--bg)",

          // ✅ 细线：不用子元素，直接 inset shadow，稳
          boxShadow: atTop ? "none" : "inset 0 -1px 0 rgba(234,245,235,0.12)",

          border: 0,
          outline: 0,
          backgroundImage: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",

          overflow: "visible",
        }}
      >
        {/* 内容层：zIndex 2，确保按钮永远在最上面 */}
        <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
          <div className="header1400" style={{ height: "100%" }}>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <BrandLogo />

              {/* 右侧留白 8（和 logo 对称） */}
              <div style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
                <LaunchButton href="/coming-soon" />
              </div>
            </div>
          </div>
        </div>

        
      </header>

      
    </>
  );
}

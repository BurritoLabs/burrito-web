"use client";

import { useEffect, useRef, useState } from "react";
import BrandLogo from "../components/brand/BrandLogo";
import LaunchButton from "../components/buttons/LaunchButton";

const HEADER_HEIGHT = 64;

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
        const delta = y - lastY.current;
        const isTop = y <= 2;

        setAtTop(isTop);
        if (isTop || delta < -6) setShow(true);
        if (!isTop && delta > 6) setShow(false);

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`siteHeader ${atTop ? "siteHeaderTop" : "siteHeaderScrolled"}`}
      style={{ transform: show ? "translateY(0)" : `translateY(-${HEADER_HEIGHT + 2}px)` }}
      aria-label="Site header"
    >
      <div className="headerInner">
        <a className="brandLink" href="#top" aria-label="Burrito home">
          <BrandLogo />
        </a>

        <nav className="headerNav" aria-label="Primary navigation">
          <a href="#products">Products</a>
          <a href="#networks">Networks</a>
          <a href="#validators">Validators</a>
        </nav>

        <div className="headerAction">
          <LaunchButton href="https://app.burrito.money" />
        </div>
      </div>
    </header>
  );
}

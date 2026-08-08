"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../components/brand/BrandLogo";
import LaunchButton from "../components/buttons/LaunchButton";
import { BurritoThemeSwitcher } from "@burritolabs/ui";

const H = 56;
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Networks", href: "/networks" },
  { label: "Validators", href: "/validators" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const headerVisible = show || menuOpen;

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

  useEffect(() => {
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

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

          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          opacity: headerVisible ? 1 : 0,
          transition:
            "transform 300ms ease, opacity 300ms ease, background-color 300ms ease, box-shadow 300ms ease",

          backgroundColor: atTop ? "transparent" : "var(--bui-color-glass)",

          boxShadow: "inset 0 -1px 0 var(--bui-color-shell-divider)",

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
            <div className="headerBar">
              <Link className="headerBrandLink" href="/" aria-label="Burrito home">
                <BrandLogo />
              </Link>

              <nav className="siteNav" aria-label="Primary navigation">
                {NAV_ITEMS.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.label}
                      className="siteNavLink"
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* 右侧留白 8（和 logo 对称） */}
              <div className="headerActions">
                <BurritoThemeSwitcher />
                <LaunchButton
                  href="https://app.burrito.money"
                  className="btnPrimary hdrCta headerLaunchCta"
                  style={{ height: 40 }}
                />
                <button
                  ref={menuButtonRef}
                  type="button"
                  className="navMenuButton"
                  aria-label="Open navigation"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMenuOpen(true)}
                >
                  <span />
                  <span />
                  <span />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="mobileNavLayer">
          <button
            type="button"
            className="mobileNavBackdrop"
            aria-label="Close navigation overlay"
            onClick={() => setMenuOpen(false)}
          />

          <aside
            id="mobile-navigation"
            className="mobileNavPanel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
          >
            <h2 id="mobile-navigation-title" className="mobileNavTitle">
              Burrito
            </h2>

            <button
              ref={closeButtonRef}
              type="button"
              className="mobileNavClose"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <span />
              <span />
            </button>

            <nav className="mobileNavLinks" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.label}
                    className="mobileNavLink"
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

import Link from "next/link";

const SITE_LINKS = [
  { label: "Ecosystem", href: "/ecosystem" },
  { label: "Networks", href: "/networks" },
  { label: "Validators", href: "/validators" },
  { label: "About", href: "/about" },
];

const PRODUCT_LINKS = [
  { label: "App", href: "https://app.burrito.money" },
  { label: "Finder", href: "https://finder.burrito.money" },
  { label: "AI", href: "https://ai.burrito.money" },
  { label: "Monitor", href: "https://monitor.burrito.money" },
];

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="footer1400">
        <div className="siteFooterGrid">
          <div className="siteFooterBrand">
            <Link href="/" className="siteFooterWordmark">
              Burrito
            </Link>
            <p>
              Products and infrastructure for Terra and Terra Classic.
            </p>
          </div>

          <nav className="siteFooterNav" aria-label="Footer navigation">
            <div>
              <div className="siteFooterLabel">Burrito</div>
              {SITE_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="footerLink">
                  {item.label}
                </Link>
              ))}
            </div>

            <div>
              <div className="siteFooterLabel">Products</div>
              {PRODUCT_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footerLink"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div>
              <div className="siteFooterLabel">Connect</div>
              <a
                href="https://github.com/BurritoLabs"
                target="_blank"
                rel="noreferrer"
                className="footerLink"
              >
                GitHub
              </a>
              <a
                href="https://x.com/burrito__money"
                target="_blank"
                rel="noreferrer"
                className="footerLink"
              >
                X
              </a>
              <a
                href="https://t.me/BurritoLabs"
                target="_blank"
                rel="noreferrer"
                className="footerLink"
              >
                Telegram
              </a>
              <a
                href="https://discord.gg/dx8xH2NBeV"
                target="_blank"
                rel="noreferrer"
                className="footerLink"
              >
                Discord
              </a>
            </div>
          </nav>
        </div>

        <div className="siteFooterBottom">
          <span>©2026 Burrito Labs Ltd. All rights reserved.</span>
          <span>Built across two Terra networks.</span>
        </div>
      </div>
    </footer>
  );
}

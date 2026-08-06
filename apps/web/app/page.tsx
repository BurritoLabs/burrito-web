import Header from "./Header";
import DualChainBlockLift from "../components/widgets/DualChainBlockLift";
import LaunchButton from "../components/buttons/LaunchButton";
import HomeBelowHero from "../components/home/HomeBelowHero";
import SiteFooter from "../components/site/SiteFooter";
import { createPageMetadata } from "./metadata";

export const metadata = createPageMetadata({
  title: "Burrito | Terra & Terra Classic",
  description:
    "Explore products and validator infrastructure for Terra and Terra Classic.",
  path: "/",
});

export default function Page() {
  return (
    <main id="home" className="pageAtmosphere">
      <Header />
      <div data-header-spacer="1" style={{ height: 57 }} aria-hidden="true" />

      {/* HERO */}
      <section className="hero">
        <div className="wrap1400 heroWrap">
          <div className="heroGrid">
            {/* LEFT */}
            <div className="heroLeft">
              <div style={{ minWidth: 0, maxWidth: 700 }}>
                <h1
                  style={{
                    margin: "0 0 14px",
                    fontWeight: 900,
                    letterSpacing: "-0.045em",
                    color: "var(--bui-color-text)",
                    fontFamily:
                      "var(--font-montserrat), Montserrat, Inter, system-ui, sans-serif",
                  }}
                >
                  <span style={{ display: "block" }}>The Gateway</span>
                  {" "}
                  <span style={{ display: "block" }}>to Terra &amp; Classic</span>
                </h1>

                <p
                  style={{
                    margin: "0 0 20px",
                    color: "var(--bui-color-text-secondary)",
                    maxWidth: 520,
                  }}
                >
                  Explore, manage, and operate across Terra and Terra Classic
                  from one Burrito ecosystem.
                </p>

                <div className="heroCta">
                  <LaunchButton
                    href="https://app.burrito.money"
                    size="large"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="heroVisual">
              <DualChainBlockLift />
            </div>
          </div>
        </div>
      </section>

      <HomeBelowHero />

      <SiteFooter />
      <div className="footerEnd" />
    </main>
  );
}

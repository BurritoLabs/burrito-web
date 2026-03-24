import Header from "./Header";
import BrandLogo from "../components/brand/BrandLogo";
import TopDownBlockLift from "../components/widgets/TopDownBlockLift";
import LaunchButton from "../components/buttons/LaunchButton";
import NodeStats from "../components/widgets/NodeStats";
const fontDisplay =
  "var(--font-montserrat), Montserrat, Inter, system-ui, sans-serif";

const C = {
  white: "#FFFFFF",
  fg72: "rgba(234,245,235,0.72)",
  fg78: "rgba(234,245,235,0.78)",
  fg80: "rgba(234,245,235,0.80)",
  green90: "rgba(82,196,26,0.9)",
};

export default function Page() {
  return (
    <main className="pageAtmosphere">
      <Header />
      <div data-header-spacer="1" style={{ height: 56 }} aria-hidden="true" />

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
    
    color: "#FFFFFF",
    



    fontFamily:
      "var(--font-montserrat), Montserrat, Inter, system-ui, sans-serif",
  }}
>
  <span style={{ display: "block" }}>The Gateway</span>
  <span style={{ display: "block" }}>
    to <span style={{ whiteSpace: "nowrap" }}>Terra Classic</span>
  
  
</span>

</h1>


        <p
          style={{
            margin: "0 0 20px",
            
            color: "rgba(234,245,235,0.72)",
            maxWidth: 520,
          }}
        >
          Burrito is a platform built on Terra Classic, designed for data exploration, asset management, and blockchain interaction.
        </p>

          <div className="heroCta"><LaunchButton href="https://app.burrito.money" size="large"/> </div></div>
      </div>

      {/* RIGHT */}
      <div style={{ justifySelf: "center" }}>
  <TopDownBlockLift />
</div>
    </div>
  </div>
</section>


      {/* Ecosystem */}
      <section id="ecosystem" style={{ padding: "92px 0 76px" }}>
        <div className="wrap1400">
          
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: C.green90,
                  }}
                >
                  Ecosystem
                </div>

                <h2
                  style={{
                    margin: "10px 0 8px",
                    fontSize: "clamp(26px, 2.4vw, 36px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.15,
                    color: C.white,
                    fontFamily: fontDisplay,
                  }}
                >
                  One place to explore, build, and operate
                </h2>

                <p
                  style={{
                    margin: 0,
                    maxWidth: 860,
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: C.fg78,
                  }}
                >
                  Burrito brings together essential entry points for Terra
                  Classic—wallet access, on-chain data, tools, and
                  infrastructure—designed to feel simple, fast, and cohesive.
                </p>
              </div>

              <div className="ecoGrid">
                {[
                  {
                    title: "Explore",
                    desc: "Browse tokens, pools, and on-chain activity with a clean, unified interface.",
                    tag: "Discover",
                    meta: "Tokens · Pools · Activity",
                  },
                  {
                    title: "Build",
                    desc: "Launch and manage contracts and tools with a developer-friendly flow.",
                    tag: "Create",
                    meta: "Contracts · Tools · Templates",
                  },
                  {
                    title: "Operate",
                    desc: "Run infra and monitor your position—validator, wallet, and protocol operations.",
                    tag: "Run",
                    meta: "Validator · Monitoring · Ops",
                  },
                ].map((x) => (
                  <div
                    key={x.title}
                    className="menuCard"
                    style={{
                      padding: 18,
                      minHeight: 168,
                      boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
                    }}
                  >
                    <div className="tagPill">{x.tag}</div>

                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 18,
                        fontWeight: 900,
                        letterSpacing: "-0.02em",
                        color: C.white,
                        fontFamily: fontDisplay,
                      }}
                    >
                      {x.title}
                    </div>

                    <div className="cardMeta">{x.meta}</div>

                    <p
                      style={{
                        margin: "10px 0 0",
                        color: C.fg78,
                        lineHeight: 1.6,
                      }}
                    >
                      {x.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        
      </section>

      {/* Value */}
      <section className="valueSection">
        <div className="wrap1400">
          <div className="valueGrid">
            <div className="valueIntro">
              <div className="sectionKicker">Why Burrito</div>

              <h2 className="valueTitle">
                Your cleanest path into Terra Classic
              </h2>

              <p className="valueLead">
                Explore, build, and operate without the noise. Burrito keeps
                the signal and removes the clutter so you can move with clarity
                and confidence.
              </p>

              <div className="valueSignal">
                Built for confident decisions and faster execution.
              </div>
            </div>

            <div className="valueCardStack">
              {[
                {
                  title: "Everything in one place",
                  desc: "Tokens, pools, contracts, and validator operations are organized into a single, readable surface.",
                },
                {
                  title: "Clarity over chaos",
                  desc: "Signal-first layouts and clear hierarchy help you scan faster and focus on what matters.",
                },
                {
                  title: "Smooth by design",
                  desc: "Consistent flows and familiar patterns turn complex on-chain actions into simple steps.",
                },
              ].map((x) => (
                <div key={x.title} className="menuCard valueCard">
                  <div className="valueCardTitle">{x.title}</div>
                  <p className="valueCardDesc">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terra Classic features */}
      <section className="featuresSection">
        <div className="wrap1400">
          <div className="featuresBoard">
            <div className="featuresHeader">
              <div className="sectionKicker">Terra Classic</div>
              <h3 className="featuresTitle">
                Governance-led blockchain with a burn mechanism
              </h3>
              <p className="featuresLead">
                Focused on low fees, fast confirmation, and community-driven
                progress, Terra Classic continues to evolve with strong
                validator infrastructure and broad ecosystem access.
              </p>
            </div>

            <div className="featuresGrid">
              {[
                {
                  title: "Low fees and fast confirmation",
                  desc: "Fast finality and low transaction costs keep everyday actions affordable and responsive, enabling frequent on-chain activity without friction.",
                },
                {
                  title: "Cosmos interoperability",
                  desc: "IBC connectivity unlocks cross-chain liquidity, shared markets, and composable workflows across the Cosmos ecosystem.",
                },
                {
                  title: "Community-led governance",
                  desc: "On-chain proposals and voting give the community direct control over upgrades, parameters, and long-term priorities.",
                },
                {
                  title: "Validator-backed security",
                  desc: "A distributed validator set maintains consensus, preserves network safety, and keeps the chain resilient under load.",
                },
                {
                  title: "Supply reduction potential",
                  desc: "Burn mechanisms and policy decisions can reduce circulating supply over time, supporting long-term economic objectives.",
                },
                {
                  title: "Builder-friendly environment",
                  desc: "Familiar tooling, low overhead, and open access reduce the cost of experimentation and speed up product iteration.",
                },
              ].map((x) => (
                <div key={x.title} className="menuCard featuresCard">
                  <div className="featuresCardTitle">{x.title}</div>
                  <p className="featuresCardDesc">{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Burrito Node */}
      <section style={{ padding: "70px 0 64px" }}>
        <div className="wrap1400">
          <div className="nodeGrid">
            <div>
              <div className="sectionKicker">Burrito Node</div>
              <h3 className="nodeTitle">Validator-grade infrastructure</h3>
              <p className="nodeLead">
                Transparent metrics and long-term reliability for the Terra
                Classic community.
              </p>
              <div className="nodeMeta">Live stats sourced on-chain.</div>
            </div>

            <div className="nodeStats">
              <NodeStats valoper="terravaloper16x9dcx9pm9j8ykl0td4hptwule706ysjel6500" />
            </div>
          </div>
        </div>
      </section>

      {/* Support */}
      <section style={{ padding: "64px 0" }}>
        <div className="wrap1400">
          
            <div
              className="menuCard"
              style={{
                borderRadius: 22,
                background:
                  "linear-gradient(135deg, rgba(82,196,26,0.10), rgba(70,130,255,0.08))",
                border: "1px solid rgba(234,245,235,0.12)",
                padding: 22,
                boxShadow: "0 22px 70px rgba(0,0,0,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              <div style={{ maxWidth: 900 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: C.green90,
                  }}
                >
                  Support
                </div>

                <h3
                  style={{
                    margin: "10px 0 8px",
                    fontSize: "clamp(22px, 2vw, 30px)",
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.2,
                    color: C.white,
                    fontFamily: fontDisplay,
                  }}
                >
                  Support Burrito by delegating to Burrito Node
                </h3>

                <p style={{ margin: 0, color: C.fg80, lineHeight: 1.75 }}>
                  Burrito Node runs validator-grade infrastructure and supports
                  long-term tools built by Burrito Labs. Delegation helps sustain
                  operations, monitoring, and development—while you keep full
                  custody.
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <LaunchButton href="https://app.burrito.money/stake">
                  Delegate
                </LaunchButton>

                {/* Open App: reuse LaunchButton styling (same as Header/Hero) */}
                <LaunchButton href="https://app.burrito.money">Open App</LaunchButton>
              </div>
            </div>
          </div>
        
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "28px 0",
          borderTop: "1px solid rgba(234,245,235,0.12)",
          marginTop: 0,
          background: "rgba(12, 20, 17, 0.35)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div className="footer1400">
          <div >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <BrandLogo />

              <div style={{ opacity: 0.72, fontSize: 13 }}>
                ©2026 Burrito Labs. All rights reserved.
              </div>

              <div
                style={{ display: "flex", gap: 14, opacity: 0.75, fontSize: 14 }}
              >
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
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="footerEnd" />
    </main>
  );
}

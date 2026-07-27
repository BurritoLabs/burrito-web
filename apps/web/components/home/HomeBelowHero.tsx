import Image from "next/image";
import Link from "next/link";
import NodeStats from "../widgets/NodeStats";
import styles from "./HomeBelowHero.module.css";

const VALIDATOR =
  "terravaloper16x9dcx9pm9j8ykl0td4hptwule706ysjel6500";

const CAPABILITIES = [
  {
    index: "01",
    name: "Access",
    products: "Burrito App",
    description:
      "Manage assets, swap, stake, vote, and interact with contracts through one dual-chain application.",
    href: "https://app.burrito.money",
  },
  {
    index: "02",
    name: "Understand",
    products: "Burrito Finder · Burrito Monitor",
    description:
      "Move from a transaction or account to broader network, governance, and validator context.",
    href: "/ecosystem",
  },
  {
    index: "03",
    name: "Create",
    products: "Burrito AI",
    description:
      "Create image, video, and voice content through a wallet-connected product with on-chain payments.",
    href: "https://ai.burrito.money",
  },
];

const NETWORKS = [
  {
    name: "Terra",
    chainId: "Phoenix-1",
    symbol: "LUNA",
    network: "phoenix" as const,
    icon: "/networks/luna.svg",
    tone: styles.terra,
    description:
      "Burrito supports the current Terra network with wallet, explorer, monitoring, governance, and validator access.",
  },
  {
    name: "Terra Classic",
    chainId: "Columbus-5",
    symbol: "LUNC",
    network: "classic" as const,
    icon: "/networks/lunc.svg",
    tone: styles.classic,
    description:
      "The original Burrito network remains fully supported across products, public data, and validator operations.",
  },
];

export default function HomeBelowHero() {
  return (
    <>
      <section
        className={styles.ecosystemSection}
        aria-labelledby="ecosystem-title"
      >
        <div className="wrap1400">
          <div className={styles.sectionIntro}>
            <div className={styles.kicker}>Ecosystem</div>
            <h2 id="ecosystem-title">
              One place to explore, understand, and operate
            </h2>
            <p>
              Burrito brings wallet access, on-chain data, network intelligence,
              AI creation, and validator infrastructure into one product
              ecosystem for Terra and Terra Classic.
            </p>
          </div>

          <div className={styles.capabilityGrid}>
            {CAPABILITIES.map((capability) => {
              const external = capability.href.startsWith("http");
              const content = (
                <>
                  <div className={styles.capabilityMeta}>
                    <span>{capability.index}</span>
                    <span>{capability.products}</span>
                  </div>
                  <h3>{capability.name}</h3>
                  <p>{capability.description}</p>
                  <span className={styles.inlineLink}>Explore</span>
                </>
              );

              return external ? (
                <a
                  className={styles.capability}
                  href={capability.href}
                  target="_blank"
                  rel="noreferrer"
                  key={capability.name}
                >
                  {content}
                </a>
              ) : (
                <Link
                  className={styles.capability}
                  href={capability.href}
                  key={capability.name}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.valueSection} aria-labelledby="value-title">
        <div className="wrap1400">
          <div className={styles.valueGrid}>
            <div className={styles.valueIntro}>
              <div className={styles.kicker}>Why Burrito</div>
              <h2 id="value-title">A clearer way through two Terra networks</h2>
              <p>
                Each Burrito product has a focused role, while network identity
                remains visible throughout. You can move between assets,
                transactions, governance, and validator data without losing
                chain context.
              </p>
              <Link className={styles.inlineLink} href="/ecosystem">
                See how the products connect
              </Link>
            </div>

            <div className={styles.valueList}>
              <article>
                <h3>Purpose-built products</h3>
                <p>
                  The App, Finder, Monitor, and AI studio each handle one clear
                  part of the Burrito experience.
                </p>
              </article>
              <article>
                <h3>Chain context by design</h3>
                <p>
                  Terra and Terra Classic are handled as independent networks,
                  with their own assets, state, governance, and data.
                </p>
              </article>
              <article>
                <h3>Infrastructure behind the interface</h3>
                <p>
                  Burrito also operates bonded validators and public monitoring
                  surfaces across both networks.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.networksSection}
        aria-labelledby="networks-title"
      >
        <div className="wrap1400">
          <div className={styles.networksHeader}>
            <div>
              <div className={styles.kicker}>Networks</div>
              <h2 id="networks-title">Built across Terra and Terra Classic</h2>
            </div>
            <Link className={styles.inlineLink} href="/networks">
              Compare the networks
            </Link>
          </div>

          <div className={styles.networkGrid}>
            {NETWORKS.map((network) => (
              <article
                className={`${styles.network} ${network.tone}`}
                key={network.chainId}
              >
                <div className={styles.networkIdentity}>
                  <Image
                    src={network.icon}
                    alt={`${network.name} logo`}
                    width={52}
                    height={52}
                  />
                  <div>
                    <h3>{network.name}</h3>
                    <span>{network.chainId}</span>
                  </div>
                </div>
                <p>{network.description}</p>
                <div className={styles.networkFooter}>
                  <span>Native asset</span>
                  <strong>{network.symbol}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.nodeSection} aria-labelledby="node-title">
        <div className="wrap1400">
          <div className={styles.nodeHeader}>
            <div>
              <div className={styles.kicker}>Burrito Node</div>
              <h2 id="node-title">Validator infrastructure on both networks</h2>
              <p>
                Burrito Node is bonded on Phoenix-1 and Columbus-5. Live staking
                data below is read independently from each network.
              </p>
            </div>
            <Link className={styles.inlineLink} href="/validators">
              View validator details
            </Link>
          </div>

          <div className={styles.validatorGrid}>
            {NETWORKS.map((network) => (
              <article
                className={`${styles.validator} ${network.tone}`}
                key={network.chainId}
              >
                <div className={styles.validatorTitle}>
                  <Image
                    src={network.icon}
                    alt=""
                    width={38}
                    height={38}
                    aria-hidden="true"
                  />
                  <div>
                    <h3>{network.name}</h3>
                    <span>{network.chainId}</span>
                  </div>
                  <b>Bonded</b>
                </div>
                <div className={styles.statsGrid}>
                  <NodeStats
                    valoper={VALIDATOR}
                    network={network.network}
                    symbol={network.symbol}
                    className={styles.stat}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.closingSection}>
        <div className="wrap1400">
          <div className={styles.closing}>
            <div>
              <div className={styles.kicker}>Burrito Labs</div>
              <h2>Products and infrastructure, maintained for the long term.</h2>
              <p>
                Use Burrito products, inspect our validator data, or join the
                community through the official project channels.
              </p>
            </div>
            <div className={styles.closingLinks}>
              <a
                className={styles.primaryLink}
                href="https://app.burrito.money"
                target="_blank"
                rel="noreferrer"
              >
                Launch App
              </a>
              <Link className={styles.secondaryLink} href="/about">
                About Burrito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import LiveChainHeight from "../../components/home/LiveChainHeight";
import SiteFrame from "../../components/site/SiteFrame";
import styles from "../../components/site/ContentPages.module.css";
import { createPageMetadata } from "../metadata";

export const metadata = createPageMetadata({
  title: "Networks | Burrito",
  description:
    "Connection details and Burrito support for Terra and Terra Classic.",
  path: "/networks",
});

const NETWORKS = [
  {
    name: "Terra",
    displayChainId: "Phoenix-1",
    chainId: "phoenix-1",
    network: "phoenix" as const,
    assets: "LUNA",
    icon: "/networks/luna.svg",
    className: "",
    description:
      "Phoenix-1 is the current Terra mainnet, with its own state, governance, validator set, and native LUNA asset. Burrito treats it as an independent network across the App, Finder, Monitor, and Burrito Node.",
    finder: "https://finder.burrito.money/mainnet",
    monitor: "https://monitor.burrito.money/luna",
  },
  {
    name: "Terra Classic",
    displayChainId: "Columbus-5",
    chainId: "columbus-5",
    network: "classic" as const,
    assets: "LUNC · USTC",
    icon: "/networks/lunc.svg",
    className: styles.networkClassic,
    description:
      "Columbus-5 is the Terra Classic mainnet, maintained with separate state, governance, validators, and native assets. It remains the original Burrito network and receives full product and validator support.",
    finder: "https://finder.burrito.money/classic",
    monitor: "https://monitor.burrito.money/lunc",
  },
];

const PRINCIPLES = [
  {
    title: "Separate chain state",
    description:
      "Accounts, balances, transactions, contracts, governance, and validators are resolved against the selected network.",
  },
  {
    title: "Visible network identity",
    description:
      "Chain names, IDs, native assets, and network color remain visible wherever context affects an action or result.",
  },
  {
    title: "Shared product language",
    description:
      "The underlying networks remain independent while Burrito keeps navigation and interaction patterns consistent.",
  },
];

export default function NetworksPage() {
  return (
    <SiteFrame>
      <section className={styles.pageIntro}>
        <div className="wrap1400">
          <div className={styles.pageIntroGrid}>
            <div className={styles.pageIntroInner}>
              <div className={styles.pageLabel}>Networks</div>
              <h1 className={styles.pageTitle}>Terra and Terra Classic</h1>
              <p className={styles.pageLead}>
                Two independent networks supported through one consistent
                Burrito ecosystem.
              </p>
            </div>
            <div className={styles.pageContext} aria-label="Supported networks">
              <div className={`${styles.contextRow} ${styles.contextTerra}`}>
                <strong>Terra</strong>
                <span>Phoenix-1</span>
              </div>
              <div className={`${styles.contextRow} ${styles.contextClassic}`}>
                <strong>Terra Classic</strong>
                <span>Columbus-5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.networkStack}>
            {NETWORKS.map((network) => (
              <article
                className={`${styles.networkArticle} ${network.className}`}
                key={network.chainId}
              >
                <div className={styles.networkTop}>
                  <div className={styles.networkIdentity}>
                    <Image
                      className={styles.networkLogo}
                      src={network.icon}
                      alt={`${network.name} logo`}
                      width={58}
                      height={58}
                    />
                    <div>
                      <h2>{network.name}</h2>
                      <div className={styles.networkId}>
                        {network.displayChainId}
                      </div>
                    </div>
                  </div>
                  <p className={styles.networkDescription}>
                    {network.description}
                  </p>
                </div>

                <div className={styles.networkFacts}>
                  <div className={styles.networkFact}>
                    <div className={styles.factLabel}>Chain ID</div>
                    <div className={styles.factValue}>{network.chainId}</div>
                  </div>
                  <div className={styles.networkFact}>
                    <div className={styles.factLabel}>Native assets</div>
                    <div className={styles.factValue}>{network.assets}</div>
                  </div>
                  <div className={styles.networkFact}>
                    <div className={styles.factLabel}>Latest block</div>
                    <div className={styles.factValue}>
                      <LiveChainHeight network={network.network} />
                    </div>
                  </div>
                  <div className={styles.networkFact}>
                    <div className={styles.factLabel}>Burrito Node</div>
                    <div className={styles.factValue}>Bonded</div>
                  </div>
                </div>

                <div className={styles.linkRow}>
                  <a
                    className={styles.textLink}
                    href="https://app.burrito.money"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open App
                  </a>
                  <a
                    className={styles.textLink}
                    href={network.finder}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Finder
                  </a>
                  <a
                    className={styles.textLink}
                    href={network.monitor}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Monitor
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className="wrap1400">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.kicker}>Network model</div>
              <h2 className={styles.sectionTitle}>
                Shared experience, independent state
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Supporting two Terra networks does not mean merging their data.
              Burrito preserves the boundaries that matter while keeping the
              product experience familiar.
            </p>
          </div>

          <div className={styles.principles}>
            {PRINCIPLES.map((principle) => (
              <article className={styles.principle} key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

import Image from "next/image";
import NodeStats from "../../components/widgets/NodeStats";
import SiteFrame from "../../components/site/SiteFrame";
import styles from "../../components/site/ContentPages.module.css";
import { createPageMetadata } from "../metadata";

export const metadata = createPageMetadata({
  title: "Validators | Burrito",
  description:
    "Live Burrito Node validator metrics across Terra and Terra Classic.",
  path: "/validators",
});

const VALIDATOR =
  "terravaloper16x9dcx9pm9j8ykl0td4hptwule706ysjel6500";

const NETWORKS = [
  {
    name: "Terra",
    chainId: "Phoenix-1",
    network: "phoenix" as const,
    symbol: "LUNA",
    icon: "/networks/luna.svg",
    className: "",
    description:
      "Burrito Node is bonded on Phoenix-1. The metrics below are read independently from the Terra staking module and link to the corresponding network records.",
    monitor: "https://monitor.burrito.money/luna/burrito-node",
  },
  {
    name: "Terra Classic",
    chainId: "Columbus-5",
    network: "classic" as const,
    symbol: "LUNC",
    icon: "/networks/lunc.svg",
    className: styles.validatorNetworkClassic,
    description:
      "Burrito Node is bonded on Columbus-5. Terra Classic staking data and validator evidence remain separate from the Phoenix-1 validator.",
    monitor: "https://monitor.burrito.money/lunc/burrito-node",
  },
];

const OPERATING_PRINCIPLES = [
  {
    title: "Chain-specific operation",
    description:
      "Each validator follows the state, governance, signing, and staking conditions of its own network.",
  },
  {
    title: "Public evidence",
    description:
      "Finder provides chain records while Monitor adds indexed performance, governance, and operational context.",
  },
  {
    title: "Delegator custody",
    description:
      "Delegation supports validator operations without transferring custody of delegated assets.",
  },
];

export default function ValidatorsPage() {
  return (
    <SiteFrame>
      <section className={styles.pageIntro}>
        <div className="wrap1400">
          <div className={styles.pageIntroGrid}>
            <div className={styles.pageIntroInner}>
              <div className={styles.pageLabel}>Validators</div>
              <h1 className={styles.pageTitle}>Burrito Node</h1>
              <p className={styles.pageLead}>
                Bonded validator infrastructure for Terra and Terra Classic,
                with live chain-specific staking data.
              </p>
              <div className={styles.pageActions}>
                <a
                  className={styles.primaryLink}
                  href="https://app.burrito.money/stake"
                  target="_blank"
                  rel="noreferrer"
                >
                  Delegate
                </a>
                <a
                  className={styles.secondaryLink}
                  href="https://monitor.burrito.money"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open Monitor
                </a>
              </div>
            </div>
            <div className={styles.pageContext} aria-label="Validator status">
              <div className={`${styles.contextRow} ${styles.contextTerra}`}>
                <strong>Terra · Phoenix-1</strong>
                <span className={styles.contextStatus}>Bonded</span>
              </div>
              <div className={`${styles.contextRow} ${styles.contextClassic}`}>
                <strong>Terra Classic · Columbus-5</strong>
                <span className={styles.contextStatus}>Bonded</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.kicker}>Live network data</div>
              <h2 className={styles.sectionTitle}>
                Independent validators on both networks
              </h2>
            </div>
            <p className={styles.sectionLead}>
              The same operator address can exist on both networks, but every
              staking value is resolved independently. Use the Monitor and
              Finder links for deeper evidence on each chain.
            </p>
          </div>

          <div className={styles.validatorStack}>
            {NETWORKS.map((network) => (
              <article
                className={`${styles.validatorNetwork} ${network.className}`}
                key={network.chainId}
              >
                <div className={styles.validatorNetworkHeader}>
                  <div className={styles.validatorNetworkTitle}>
                    <Image
                      src={network.icon}
                      alt={`${network.name} logo`}
                      width={48}
                      height={48}
                    />
                    <div>
                      <h2>{network.name}</h2>
                      <span>{network.chainId}</span>
                    </div>
                  </div>
                  <p className={styles.validatorNetworkCopy}>
                    {network.description}
                  </p>
                </div>

                <div className={styles.statsGrid}>
                  <NodeStats
                    valoper={VALIDATOR}
                    network={network.network}
                    symbol={network.symbol}
                    className={styles.statCard}
                  />
                </div>

                <div className={styles.linkRow}>
                  <a
                    className={styles.textLink}
                    href={network.monitor}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View full validator evidence
                  </a>
                  <a
                    className={styles.textLink}
                    href={`https://finder.burrito.money/${
                      network.network === "phoenix" ? "mainnet" : "classic"
                    }/validator/${VALIDATOR}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open validator in Finder
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.validatorCta}>
            <p>
              Delegation supports the validator infrastructure and public
              products Burrito maintains across both networks. Delegators retain
              full custody at all times.
            </p>
            <a
              className={styles.primaryLink}
              href="https://app.burrito.money/stake"
              target="_blank"
              rel="noreferrer"
            >
              Delegate to Burrito Node
            </a>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className="wrap1400">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.kicker}>Operating model</div>
              <h2 className={styles.sectionTitle}>
                Infrastructure that can be inspected
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Burrito combines direct on-chain records with indexed monitoring
              so validator status is not reduced to a single headline number.
            </p>
          </div>

          <div className={styles.principles}>
            {OPERATING_PRINCIPLES.map((principle) => (
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

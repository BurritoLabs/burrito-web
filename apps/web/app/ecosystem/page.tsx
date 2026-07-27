import Image from "next/image";
import Link from "next/link";
import SiteFrame from "../../components/site/SiteFrame";
import styles from "../../components/site/ContentPages.module.css";
import { createPageMetadata } from "../metadata";

export const metadata = createPageMetadata({
  title: "Ecosystem | Burrito",
  description:
    "Explore the Burrito products built for Terra and Terra Classic.",
  path: "/ecosystem",
});

const PRODUCTS = [
  {
    name: "Burrito App",
    type: "Wallet and DeFi",
    description:
      "The main Burrito application brings wallet activity and common on-chain actions into one dual-chain interface. Network selection stays explicit while you manage assets and move between staking, governance, swaps, and contracts.",
    points: [
      "Wallet and portfolio management",
      "Swap, stake, vote, and contract interaction",
      "Independent Terra and Terra Classic context",
    ],
    href: "https://app.burrito.money",
    image: "/products/burrito-app.jpg",
    alt: "Burrito App dashboard",
  },
  {
    name: "Burrito Finder",
    type: "Block explorer",
    description:
      "Finder is the direct path to chain records. Search an address, transaction, block, contract, or validator and keep the selected network visible throughout the investigation.",
    points: [
      "Accounts, transactions, and blocks",
      "Contracts, tokens, and validators",
      "Dedicated views for both supported networks",
    ],
    href: "https://finder.burrito.money",
    image: "/products/burrito-finder.jpg",
    alt: "Burrito Finder block details",
  },
  {
    name: "Burrito Monitor",
    type: "Network intelligence",
    description:
      "Monitor adds the operational layer around raw chain data. It organizes validator performance, governance, blocks, oracle activity, and network health into views designed for ongoing observation.",
    points: [
      "Validator and delegator evidence",
      "Governance and proposal context",
      "Dual-chain network and block monitoring",
    ],
    href: "https://monitor.burrito.money",
    image: "/products/burrito-monitor.jpg",
    alt: "Burrito Monitor network dashboard",
  },
  {
    name: "Burrito AI",
    type: "Wallet-connected creation",
    description:
      "Burrito AI extends the ecosystem beyond chain operations. It provides image, video, and voice creation through a wallet-connected experience with transparent credit and payment flows.",
    points: [
      "Image, video, and voice creation",
      "Wallet-based access",
      "On-chain payment support",
    ],
    href: "https://ai.burrito.money",
    image: "/products/burrito-ai.jpg",
    alt: "Burrito AI creation interface",
  },
];

const WORKFLOW = [
  {
    index: "01",
    title: "Act",
    description:
      "Use Burrito App for assets, staking, governance, swaps, and contracts.",
  },
  {
    index: "02",
    title: "Verify",
    description:
      "Open the same network context in Finder or Monitor when more evidence is needed.",
  },
  {
    index: "03",
    title: "Create",
    description:
      "Move into Burrito AI without leaving the Burrito wallet-connected ecosystem.",
  },
];

export default function EcosystemPage() {
  return (
    <SiteFrame>
      <section className={styles.pageIntro}>
        <div className="wrap1400">
          <div className={styles.pageIntroGrid}>
            <div className={styles.pageIntroInner}>
              <div className={styles.pageLabel}>Ecosystem</div>
              <h1 className={styles.pageTitle}>Burrito products</h1>
              <p className={styles.pageLead}>
                Focused products for using, exploring, monitoring, and creating
                across Terra and Terra Classic.
              </p>
            </div>
            <div
              className={`${styles.pageContext} ${styles.productContext}`}
              aria-label="Burrito products"
            >
              <span>Burrito App</span>
              <span>Burrito Finder</span>
              <span>Burrito Monitor</span>
              <span>Burrito AI</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.kicker}>One connected flow</div>
              <h2 className={styles.sectionTitle}>Built to work together</h2>
            </div>
            <p className={styles.sectionLead}>
              Burrito products are separate where their responsibilities differ,
              but they share the same network model. That keeps the interface
              focused while making it easy to move from an action to its
              underlying chain evidence.
            </p>
          </div>

          <div className={styles.workflow}>
            {WORKFLOW.map((step) => (
              <article className={styles.workflowStep} key={step.title}>
                <div className={styles.workflowIndex}>{step.index}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className="wrap1400">
          <div className={styles.productStory}>
            {PRODUCTS.map((product, index) => (
              <article
                className={`${styles.productFeature} ${
                  index % 2 === 1 ? styles.productFeatureReverse : ""
                }`}
                key={product.name}
              >
                <div className={styles.productCopy}>
                  <div className={styles.productType}>{product.type}</div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <ul className={styles.productPoints}>
                    {product.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <a
                    className={styles.textLink}
                    href={product.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open {product.name}
                  </a>
                </div>

                <a
                  className={styles.productMedia}
                  href={product.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${product.name}`}
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    width={1200}
                    height={760}
                    priority={index === 0}
                    sizes="(max-width: 900px) 100vw, 58vw"
                  />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.closingBand}>
            <div>
              <h2>Public products backed by operating infrastructure</h2>
              <p>
                Burrito also runs bonded validators on Terra and Terra Classic,
                connecting the product layer with long-term network operations.
              </p>
            </div>
            <Link className={styles.secondaryLink} href="/validators">
              View Burrito Node
            </Link>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

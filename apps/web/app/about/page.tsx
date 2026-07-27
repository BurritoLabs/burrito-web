import SiteFrame from "../../components/site/SiteFrame";
import styles from "../../components/site/ContentPages.module.css";
import { createPageMetadata } from "../metadata";

export const metadata = createPageMetadata({
  title: "About | Burrito",
  description:
    "Burrito Labs Ltd. builds products and operates validator infrastructure for Terra and Terra Classic.",
  path: "/about",
});

const WORK = [
  {
    title: "Products",
    description:
      "Wallet, explorer, monitoring, and AI products designed around focused responsibilities and a consistent Burrito experience.",
  },
  {
    title: "Networks",
    description:
      "Independent support for Terra and Terra Classic, with network identity and chain state kept explicit throughout.",
  },
  {
    title: "Infrastructure",
    description:
      "Bonded validators and public operational data that connect the product layer to long-term network participation.",
  },
];

export default function AboutPage() {
  return (
    <SiteFrame>
      <section className={styles.pageIntro}>
        <div className="wrap1400">
          <div className={`${styles.pageIntroInner} ${styles.pageIntroSimple}`}>
            <div className={styles.pageLabel}>About</div>
            <h1 className={styles.pageTitle}>Burrito Labs Ltd.</h1>
            <p className={styles.pageLead}>
              An independent product and infrastructure company working across
              Terra and Terra Classic.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.aboutStory}>
            <div>
              <div className={styles.kicker}>Our direction</div>
              <h2>From one network to a broader Burrito ecosystem</h2>
            </div>
            <div className={styles.aboutBody}>
              <p>
                Burrito began in the Terra Classic community with a practical
                focus: make chain activity easier to access, understand, and
                operate. That work grew from a single interface into a set of
                focused public products.
              </p>
              <p>
                Burrito now supports both Terra and Terra Classic through the
                App, Finder, Monitor, AI studio, and bonded validators. The two
                networks remain independent, while the products share one
                consistent design and operating philosophy.
              </p>
              <p>
                Burrito Labs Ltd. maintains this work as a long-term product and
                infrastructure effort rather than a collection of unrelated
                experiments.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionMuted}`}>
        <div className="wrap1400">
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.kicker}>What we maintain</div>
              <h2 className={styles.sectionTitle}>
                Products, networks, and infrastructure
              </h2>
            </div>
            <p className={styles.sectionLead}>
              Each part of Burrito has a distinct role, but they are maintained
              as one system with shared standards for clarity, network context,
              and public access.
            </p>
          </div>

          <div className={styles.workGrid}>
            {WORK.map((item) => (
              <article className={styles.workItem} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="wrap1400">
          <div className={styles.contactBand}>
            <div>
              <h2>Follow Burrito&apos;s public work</h2>
              <p>
                Product releases, validator updates, source code, and community
                announcements are published through Burrito&apos;s official
                channels.
              </p>
            </div>
            <div className={styles.linkRow}>
              <a
                className={styles.primaryLink}
                href="https://x.com/burrito__money"
                target="_blank"
                rel="noreferrer"
              >
                Follow on X
              </a>
              <a
                className={styles.secondaryLink}
                href="https://github.com/BurritoLabs"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}

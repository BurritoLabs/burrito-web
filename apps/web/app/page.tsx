import Image from "next/image";
import Header from "./Header";
import BrandLogo from "../components/brand/BrandLogo";
import LaunchButton from "../components/buttons/LaunchButton";
import DualChainStatus from "../components/widgets/DualChainStatus";

const products = [
  {
    name: "Burrito App",
    label: "Trade and operate",
    description:
      "Wallet, aggregated swaps, markets, launchpad, staking, governance and contracts across both Terra networks.",
    href: "https://app.burrito.money",
    image: "/products/app.png",
    imageAlt: "Burrito App dashboard on Terra Classic",
    network: "LUNA + LUNC",
    accent: "productGreen",
    action: "Launch App",
  },
  {
    name: "Burrito AI",
    label: "Create with a wallet",
    description:
      "Generate video, images and voice with wallet-native access. Pay with LUNC, USTC or LUNA.",
    href: "https://ai.burrito.money",
    image: "/products/ai.png",
    imageAlt: "Burrito AI generation studio",
    network: "LUNA + LUNC",
    accent: "productCyan",
    action: "Open AI",
  },
  {
    name: "Burrito Monitor",
    label: "See network health",
    description:
      "Track validators, blocks, governance, delegators and chain health with visible source evidence.",
    href: "https://monitor.burrito.money",
    image: "/products/monitor.png",
    imageAlt: "Burrito Monitor LUNA network dashboard",
    network: "LUNA + LUNC",
    accent: "productOrange",
    action: "Open Monitor",
  },
  {
    name: "Burrito Finder",
    label: "Verify on-chain",
    description:
      "Search blocks, transactions, accounts, contracts and validators on Classic and Phoenix.",
    href: "https://finder.burrito.money",
    image: "/products/finder.png",
    imageAlt: "Burrito Finder on the Phoenix network",
    network: "PHOENIX + CLASSIC",
    accent: "productBlue",
    action: "Open Finder",
  },
] as const;

const networks = [
  {
    name: "Terra",
    symbol: "LUNA",
    chainId: "phoenix-1",
    description:
      "Full Burrito product coverage with native LUNA markets, swaps, launchpad, monitoring, exploration and validator operations.",
    className: "networkLuna",
    href: "https://monitor.burrito.money/luna",
  },
  {
    name: "Terra Classic",
    symbol: "LUNC",
    chainId: "columbus-5",
    description:
      "Deep Classic coverage across LUNC and USTC markets, swaps, launchpad, monitoring, exploration and validator operations.",
    className: "networkLunc",
    href: "https://monitor.burrito.money/lunc",
  },
] as const;

const validators = [
  {
    network: "Terra",
    symbol: "LUNA",
    chainId: "phoenix-1",
    href: "https://monitor.burrito.money/luna/burrito-node",
    className: "validatorLuna",
  },
  {
    network: "Terra Classic",
    symbol: "LUNC",
    chainId: "columbus-5",
    href: "https://monitor.burrito.money/lunc/burrito-node",
    className: "validatorLunc",
  },
] as const;

export default function Page() {
  return (
    <main className="siteShell">
      <Header />

      <section className="hero" id="top">
        <div className="wrap heroGrid">
          <div className="heroCopy">
            <div className="sectionKicker">Two networks. One ecosystem.</div>
            <h1>Burrito for Terra and Terra Classic</h1>
            <p className="heroLead">
              Apps, AI, monitoring, exploration and validator infrastructure
              built for LUNA and LUNC.
            </p>
            <div className="heroActions">
              <LaunchButton href="https://app.burrito.money" size="large" />
              <a className="secondaryButton" href="#products">
                Explore the ecosystem
              </a>
            </div>
            <div className="heroProof" aria-label="Burrito ecosystem coverage">
              <span>4 live products</span>
              <span>2 active validators</span>
              <span>2 supported networks</span>
            </div>
          </div>

          <DualChainStatus />
        </div>
      </section>

      <section className="productsSection" id="products">
        <div className="wrap">
          <div className="sectionHeader sectionHeaderWide">
            <div>
              <div className="sectionKicker">Burrito ecosystem</div>
              <h2>Built products, not promises</h2>
            </div>
            <p>
              One connected product family for using, creating on, monitoring
              and verifying activity across Terra and Terra Classic.
            </p>
          </div>

          <div className="productGrid">
            {products.map((product) => (
              <a
                className={`productCard ${product.accent}`}
                href={product.href}
                key={product.name}
              >
                <div className="productMedia">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={1440}
                    height={900}
                    sizes="(max-width: 767px) 100vw, 50vw"
                  />
                </div>
                <div className="productBody">
                  <div className="productTopline">
                    <span>{product.label}</span>
                    <span className="networkTag">{product.network}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="productAction">{product.action}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="networksSection" id="networks">
        <div className="wrap">
          <div className="sectionHeader">
            <div className="sectionKicker">Supported networks</div>
            <h2>Native on both sides of Terra</h2>
            <p>
              Burrito treats Terra and Terra Classic as first-class networks,
              with dedicated data, routes and validator infrastructure for each.
            </p>
          </div>

          <div className="networkGrid">
            {networks.map((network) => (
              <a
                className={`networkCard ${network.className}`}
                href={network.href}
                key={network.symbol}
              >
                <div className="networkIdentity">
                  <span className="networkMark" aria-hidden="true" />
                  <div>
                    <span className="networkSymbol">{network.symbol}</span>
                    <h3>{network.name}</h3>
                  </div>
                </div>
                <span className="chainId">{network.chainId}</span>
                <p>{network.description}</p>
                <span className="textLink">View live network</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="validatorsSection" id="validators">
        <div className="wrap validatorLayout">
          <div className="validatorIntro">
            <div className="sectionKicker">Burrito Node</div>
            <h2>Validator infrastructure on LUNA and LUNC</h2>
            <p>
              Burrito operates active validators on both networks. Monitor live
              signing, voting power, governance and delegator evidence in
              Burrito Monitor.
            </p>
            <a className="secondaryButton" href="https://app.burrito.money/stake">
              Delegate in Burrito App
            </a>
          </div>

          <div className="validatorList">
            {validators.map((validator) => (
              <a
                className={`validatorRow ${validator.className}`}
                href={validator.href}
                key={validator.symbol}
              >
                <div>
                  <span className="liveLabel">
                    <span className="liveDot" aria-hidden="true" />
                    Active validator
                  </span>
                  <h3>Burrito Node</h3>
                  <p>{validator.network}</p>
                </div>
                <div className="validatorMeta">
                  <strong>{validator.symbol}</strong>
                  <span>{validator.chainId}</span>
                  <span className="textLink">Open node profile</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="closingSection">
        <div className="wrap closingInner">
          <div>
            <div className="sectionKicker">Burrito Labs</div>
            <h2>One identity across the Terra ecosystem</h2>
            <p>
              Move from discovery to action without leaving the Burrito product
              family.
            </p>
          </div>
          <div className="closingActions">
            <LaunchButton href="https://app.burrito.money" size="large">
              Launch App
            </LaunchButton>
            <a className="secondaryButton" href="https://monitor.burrito.money">
              Open Monitor
            </a>
          </div>
        </div>
      </section>

      <footer className="siteFooter">
        <div className="wrap footerInner">
          <BrandLogo />
          <div className="footerProducts" aria-label="Burrito products">
            <a href="https://app.burrito.money">App</a>
            <a href="https://ai.burrito.money">AI</a>
            <a href="https://monitor.burrito.money">Monitor</a>
            <a href="https://finder.burrito.money">Finder</a>
          </div>
          <div className="footerLegal">©2026 Burrito Labs</div>
          <div className="footerSocial">
            <a href="https://github.com/BurritoLabs" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://x.com/burrito__money" target="_blank" rel="noreferrer">
              X
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

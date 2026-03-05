import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Off-Grid Communication <br></br> for Northeast Ohio
        </Heading>
        {/* <p className="hero__subtitle">Meshtastic, MeshCore, and more!</p> */}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Northeast Ohio Mesh Network">
      <HomepageHeader />
      <main>
        <section className="light-bg">
          <div className="container">
            <h2>What is the NEO Mesh?</h2>
            <div className="about-description">
              <p>The NEO Mesh is a volunteer-led, open community project focused on building a secure and reliable off-grid communication network throughout the Northeast Ohio, using affordable, low-power radio devices. The area has two parallel networks running on MeshCore and Meshtastic.</p>
            </div>

            <Link
              className="discord-button button button--secondary button--lg"
              to="https://discord.gg/hDCxm47JSF">
              <b>Join us on Discord!</b>
            </Link>
          </div>
        </section>
        <HomepageFeatures />

        <a rel="me" href="https://mastodon.social/@NEOMesh"></a>
      </main>
    </Layout>
  );
}

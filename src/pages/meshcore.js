import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`MeshCore - ${siteConfig.title}`}
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            MeshCore
          </Heading>
          <div className={styles.buttons}>
            <a
              className="button button--secondary button--lg"
              href="https://corescope.neomesh.org"
              target="_blank"
              rel="noopener noreferrer">
              View Map
            </a>
            <Link
              className="button button--secondary button--lg"
              to="#contact">
              Get Connected
            </Link>
          </div>
        </div>
      </header>
      <main className="meshcore">
        <section id="repeaters" className="repeaters light-bg">
          <div className="container">
            <h2>What is MeshCore?</h2>
            <div className="about-description">
              <p>MeshCore is a multi-platform system for enabling secure text-based communications utilizing LoRa radio hardware. It can be used for Off-Grid Communication, Emergency Response & Disaster Recovery, Outdoor Activities, Tactical Security including law enforcement, private security and also IoT sensor networks.</p>
              <p><a href="https://meshcore.io/" target="_blank" rel="noopener">Learn more about MeshCore →</a></p>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2>Join the Network</h2>
            <div className="contact-grid">
              {/* MeshCore */}
              <div className="contact-card">
                <h3>MeshCore Radio Settings</h3>
                <div className="radio-settings-table">
                <table className="radio-table">
                  <tbody>
                    <tr>
                      <td><strong>Preset:</strong></td>
                      <td>USA/Canada (Recommended)</td>
                    </tr>
                    <tr>
                      <td><strong>Frequency:</strong></td>
                      <td>910.525 MHz</td>
                    </tr>
                    <tr>
                      <td><strong>Bandwidth:</strong></td>
                      <td>62.5 kHz</td>
                    </tr>
                    <tr>
                      <td><strong>Spreading Factor:</strong></td>
                      <td>7</td>
                    </tr>
                    <tr>
                      <td><strong>Coding Rate:</strong></td>
                      <td>8</td>
                    </tr>
                    <tr>
                      <td><strong>Advert (Zero Hop):</strong></td>
                      <td>240 minutes</td>
                    </tr>
                    <tr>
                      <td><strong>Advert (Flood):</strong></td>
                      <td>47 hours</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="map-section light-bg">
          <div className="container">
            <h2>Network Maps</h2>
            <p>See live MeshCore nodes on the network, or check wardrive coverage across the region.</p>
            <div className={styles.buttons}>
              <a
                className="button button--primary button--lg"
                href="https://corescope.neomesh.org"
                target="_blank"
                rel="noopener noreferrer">
                MeshCore Live Map →
              </a>
              <a
                className="button button--primary button--lg"
                href="https://cle.meshmapper.net"
                target="_blank"
                rel="noopener noreferrer">
                MeshMapper Coverage Map →
              </a>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}

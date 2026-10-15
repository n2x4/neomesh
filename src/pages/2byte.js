import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';
import Admonition from '@theme/Admonition';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './2byte.module.css';

export default function TwoByte() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`2-Byte Hashes - ${siteConfig.title}`}
      description="How to switch MeshCore companions and repeaters to 2-byte path hashes."
    >
      <main className={styles.page}>
        <Heading as="h1">Switch to 2-Byte Hashes</Heading>
        <p className={styles.lead}>
          2-byte path hashes make nodes easier to tell apart on the mesh.
        </p>

        <Admonition type="warning" title="Upgrade your firmware first">
          <p>
            We strongly recommend updating every device to the latest MeshCore
            firmware using the{' '}
            <a href="https://flasher.meshcore.io" target="_blank" rel="noopener noreferrer">
              MeshCore Flasher
            </a>
            .
          </p>
          <p>
            Devices older than <strong>1.14</strong> don't support 2-byte hashes
            and will silently drop these packets. Upgrade them before switching.
          </p>
        </Admonition>

        <section className={styles.step}>
          <Heading as="h2">Companion</Heading>
          <ol>
            <li>Open the MeshCore app (version 1.41.0 or newer).</li>
            <li>Tap <strong>Settings</strong> (gear icon).</li>
            <li>Open <strong>Experimental Settings</strong>.</li>
            <li>Set the path hash size to <strong>2 bytes</strong>.</li>
          </ol>
        </section>

        <section className={styles.step}>
          <Heading as="h2">Repeater / Room Server</Heading>
          <ol>
            <li>Log in as admin and open the command line (remote admin or USB serial).</li>
            <li>
              Run:
              <CodeBlock language="text">set path.hash.mode 1</CodeBlock>
            </li>
            <li>
              Check it:
              <CodeBlock language="text">get path.hash.mode</CodeBlock>
              The reply should be <code>&gt; 1</code>. No reboot needed.
            </li>
          </ol>
        </section>

        <p className={styles.footerLink}>
          <a
            href="https://mesh.0x8v.io/#meshcore/insights?is=1&go=sizes"
            target="_blank"
            rel="noopener noreferrer">
            See hash size usage across the mesh →
          </a>
        </p>
      </main>
    </Layout>
  );
}

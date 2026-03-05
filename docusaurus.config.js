// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NEO Mesh',
  tagline: 'Resilient, off-grid community communications across Northeast Ohio',
  favicon: 'img/favicon.ico',
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'darkreader-lock',
      },
    },
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://n2x4.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/neomesh/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'n2x4', // Usually your GitHub org/user name.
  projectName: 'neomesh', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  plugins: [
    'docusaurus-plugin-sass',
  ],

  stylesheets: [
    // include any external stylesheets here (e.g. for an external tool we are using)

  ],

  scripts: [
    // include any external stylesheets here (e.g. for an external tool we are using)
    // {
    //   src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
    //   defer: true
    // },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/n2x4/neomesh/tree/main/',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            // 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          ]
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
        disableSwitch: false
      },
      navbar: {
        title: 'NEO Mesh',
        logo: {
          alt: 'NEO Mesh Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'Introduction',
            position: 'left',
            label: 'Resources',
          },
          {
            to: '/meshcore',
            label: 'MeshCore',
            position: 'left'
          },
          {
            to: '/meshtastic',
            label: 'Meshtastic',
            position: 'left'
          },
          {
            href: 'https://discord.gg/hDCxm47JSF',
            position: 'right',
            className: 'header-icon discord',
            'aria-label': 'Discord server',
          },
          {
            href: 'https://www.facebook.com/groups/1533160050958272',
            position: 'right',
            className: 'header-icon facebook',
            'aria-label': 'Facebook Group',
          },
          {
            href: 'https://github.com/n2x4/neomesh',
            position: 'right',
            className: 'header-icon github',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/hDCxm47JSF',
              },
              {
                label: 'Github',
                href: 'https://github.com/n2x4/neomesh',
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Northeast Ohio Mesh Network. Built with ❤️ for resilient communications.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

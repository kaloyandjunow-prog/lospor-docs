import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

const config: Config = {
  title: "LOSPOR Documentation",
  tagline: "Large Open Source Perioperative Register",
  favicon: "img/logo.png",
  url: "https://docs.lospor.org",
  baseUrl: "/",
  onBrokenLinks: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  i18n: { defaultLocale: "en", locales: ["en"] },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "/",
          editUrl: "https://github.com/kaloyandjunow-prog/lospor-app/tree/main/",
        },
        blog: false,
        theme: { customCss: "./src/css/custom.css" },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.png",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: "LOSPOR Docs",
      logo: { alt: "LOSPOR", src: "img/logo.png", style: { height: "36px", width: "auto" } },
      items: [
        { type: "docSidebar", sidebarId: "userSidebar", position: "left", label: "User Guide" },
        { to: "/self-hosting", label: "Self-hosting", position: "left" },
        { to: "/data-research", label: "Data & Research", position: "left" },
        { href: "https://app.lospor.org", label: "Open App", position: "right" },
        { href: "https://github.com/kaloyandjunow-prog/lospor-app", label: "GitHub", position: "right" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "LOSPOR",
          items: [
            { label: "Home", href: "https://lospor.org" },
            { label: "Protocol App", href: "https://app.lospor.org" },
            { label: "Documentation", href: "https://docs.lospor.org" },
          ],
        },
        {
          title: "Open Source",
          items: [
            { label: "GitHub", href: "https://github.com/kaloyandjunow-prog/lospor-app" },
            { label: "Licence (AGPL-3.0)", href: "https://github.com/kaloyandjunow-prog/lospor-app/blob/main/LICENSE" },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} LOSPOR · AGPL-3.0 licence · designed with GDPR principles`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["bash", "typescript", "json"],
    },
  } satisfies Preset.ThemeConfig,
}

export default config

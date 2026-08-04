import type { SidebarsConfig } from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
  userSidebar: [
    "intro",
    {
      type: "category",
      label: "User Guide",
      collapsed: false,
      items: [
        "user-guide/getting-started",
        "user-guide/dashboard",
        "user-guide/preop-form",
        "user-guide/intraop-form",
        "user-guide/postop-form",
        "user-guide/printing",
        "user-guide/handover",
        "user-guide/settings",
      ],
    },
    "admin-guide",
    "pediatric-mode",
    "clinical-rules",
    "pediatric-platform-draft",
    "self-hosting",
    "release-v7",
    "architecture",
    "api",
    "autosave-manager",
    "data-research",
    "research-browser",
    "changelog",
  ],
}

export default sidebars

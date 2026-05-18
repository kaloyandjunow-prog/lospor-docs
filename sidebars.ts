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
    "self-hosting",
    "data-research",
  ],
}

export default sidebars

import { hopeTheme } from "vuepress-theme-hope";

import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://dzwm.github.io",
  author: {
    name: "dzwm",
    url: "https://github.com/dzwm",
  },
  logo: "/images/home-hero.png",
  repo: "dzwm/dzwm.github.io",
  docsDir: "docs",
  darkmode: "toggle",
  navbarAutoHide: "none",
  fullscreen: true,
  print: false,

  locales: {
    "/": {
      navbar: zhNavbar,
      sidebar: zhSidebar,
      footer:
        '使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 构建',
      displayFooter: true,
    },
  },

  blog: {
    name: "dzwm",
    description: "工程实践、前端体验和长期可复用的技术笔记。",
    avatar: "/images/home-hero.png",
    intro: "/about/",
    roundAvatar: true,
    medias: {
      GitHub: "https://github.com/dzwm",
    },
  },

  markdown: {
    align: true,
    attrs: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    mark: true,
    tabs: true,
    tasklist: true,
  },

  plugins: {
    blog: true,
    components: {
      components: ["Badge", "VPCard"],
    },
    copyCode: {
      showInMobile: true,
    },
    readingTime: true,
  },
});

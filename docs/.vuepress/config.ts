import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  lang: "zh-CN",
  title: "首页",
  description: "dzwm 的个人技术博客",
  base: "/",
  head: [
    ["meta", { name: "theme-color", content: "#f4b8cd" }],
    ["link", { rel: "icon", href: "/images/avatar-anime.jpg" }],
  ],
  bundler: viteBundler(),

  theme: hopeTheme({
    hostname: "https://dzwm.github.io",
    author: {
      name: "dzwm",
      url: "https://github.com/dzwm",
    },
    logo: "/images/avatar-anime.jpg",
    repo: "dzwm/dzwm.github.io",
    docsDir: "docs",
    darkmode: "disable",
    navbarAutoHide: "none",
    fullscreen: false,
    print: false,
    navbar: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/article/" },
      { text: "分类", link: "/category/" },
      { text: "标签", link: "/tag/" },
      { text: "归档", link: "/timeline/" },
      { text: "GitHub", link: "https://github.com/dzwm" },
    ],
    sidebar: {
      "/posts/": [
        {
          text: "起步",
          icon: "pen-to-square",
          children: ["hello-blog", "vuepress-notes"],
        },
      ],
    },
    blog: {
      name: "dzwm",
      description: "记录前端、工程实践和一些带点二次元气息的长期笔记。",
      avatar: "/images/avatar-anime.jpg",
      intro: "/intro.html",
      roundAvatar: true,
      medias: {
        GitHub: "https://github.com/dzwm",
      },
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
    markdown: {
      align: true,
      attrs: true,
      tabs: true,
      tasklist: true,
    },
  }),
});

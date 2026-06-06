import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "dzwm",
  description: "dzwm 的个人技术博客与长期笔记",
  head: [
    ["meta", { name: "theme-color", content: "#14756c" }],
    ["link", { rel: "icon", href: "/images/home-hero.png" }],
  ],
  bundler: viteBundler(),
  theme,
});

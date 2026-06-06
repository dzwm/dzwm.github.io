import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/articles/": [
    {
      text: "文章",
      icon: "pen-to-square",
      prefix: "/articles/",
      children: ["", "blog-start", "vuepress-template"],
    },
  ],
  "/notes/": [
    {
      text: "笔记",
      icon: "book",
      prefix: "/notes/",
      children: ["", "frontend", "tooling", "deployment"],
    },
  ],
  "/projects/": [
    {
      text: "项目",
      icon: "laptop-code",
      prefix: "/projects/",
      children: [""],
    },
  ],
  "/about/": [
    {
      text: "关于",
      icon: "circle-user",
      prefix: "/about/",
      children: [""],
    },
  ],
  "/article/": [],
  "/category/": [],
  "/star/": [],
  "/tag/": [],
  "/timeline/": [],
});

import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "首页", icon: "house", link: "/" },
  { text: "文章", icon: "pen-to-square", link: "/articles/" },
  { text: "笔记", icon: "book", link: "/notes/" },
  { text: "项目", icon: "laptop-code", link: "/projects/" },
  {
    text: "索引",
    icon: "folder-tree",
    children: [
      { text: "分类", icon: "folder-open", link: "/category/" },
      { text: "标签", icon: "tags", link: "/tag/" },
      { text: "归档", icon: "clock", link: "/timeline/" },
    ],
  },
  { text: "关于", icon: "circle-user", link: "/about/" },
]);

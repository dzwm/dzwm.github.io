---
title: 博客框架先跑起来
date: 2026-06-06
category:
  - 博客建设
tag:
  - VuePress
  - Theme Hope
  - GitHub Pages
sticky: 1
---

# 博客框架先跑起来

第一阶段先把博客的结构、导航和视觉风格定下来。内容可以慢慢导入，但基础框架需要先稳定：

- 首页能表达博客主题和方向
- 文章页有清晰的标题、目录、分类和标签
- 后续可以平滑部署到 `dzwm.github.io`

## 页面结构

当前保留首页、文章、分类、标签、归档和关于页面。这个结构足够轻，后续也方便扩展专题页。

```ts
const blog = {
  owner: "dzwm",
  stack: ["VuePress", "Theme Hope", "GitHub Pages"],
  goal: "长期维护的个人技术笔记",
};
```

## 后续计划

确认视觉风格后，可以继续补充正式文章、站点图标、评论系统和自动部署流程。


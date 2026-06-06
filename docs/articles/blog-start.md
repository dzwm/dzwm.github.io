---
title: 博客框架先跑起来
date: 2026-06-07
category:
  - 博客建设
tag:
  - VuePress
  - Theme Hope
  - GitHub Pages
sticky: 1
---

# 博客框架先跑起来

v3 不再继续在上一版基础上细修，而是换成更接近成熟 Theme Hope 站点的结构：配置拆分、内容分区、首页使用主题原生 ProjectHome 模板。

## 为什么换结构

上一版的问题主要来自博客首页侧栏和卡片状态切换。继续覆盖 CSS 可以缓解，但长期维护成本高。直接回到主题支持最完整的模板结构，后续导入内容更稳。

## 当前保留

- 首页
- 文章
- 笔记
- 项目
- 分类、标签、归档
- 关于

```ts
const site = {
  owner: "dzwm",
  framework: "VuePress 2",
  theme: "Theme Hope",
  goal: "stable personal notes",
};
```

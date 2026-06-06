---
title: VuePress 模板化记录
date: 2026-06-07
category:
  - 博客建设
tag:
  - VuePress
  - 模板
  - 站点结构
---

# VuePress 模板化记录

v3 参考了现成 VuePress/Theme Hope 站点的组织方式，把主题配置拆分成几个稳定文件。

## 文件边界

- `config.ts`：VuePress 基础配置
- `theme.ts`：Theme Hope 主题能力
- `navbar/index.ts`：顶部导航
- `sidebar/index.ts`：侧边栏
- `styles/index.scss`：少量视觉覆盖和稳定性修正

这种拆法比把所有内容堆在一个配置文件里更适合长期维护。

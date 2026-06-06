---
home: true
icon: house
title: 首页
heroImage: /images/home-hero.png
heroImageStyle:
  maxWidth: 17rem
  borderRadius: 8px
heroText: dzwm
tagline: 工程实践、前端体验和长期笔记，先把能维护很多年的框架搭稳。
actions:
  - text: 开始阅读
    icon: book-open
    link: /articles/
    type: primary
  - text: 技术笔记
    icon: bookmark
    link: /notes/
  - text: GitHub
    icon: brands:github
    link: https://github.com/dzwm
highlights:
  - header: 工程实践
    description: 用文章沉淀站点建设、工具选择、踩坑记录和复盘。
    features:
      - title: 博客建设
        icon: pen-to-square
        details: 记录站点框架、主题配置和 GitHub Pages 发布流程。
        link: /articles/blog-start.html
      - title: VuePress 模板
        icon: layer-group
        details: 以成熟 Theme Hope 结构作为长期维护底座。
        link: /articles/vuepress-template.html
      - title: 内容导入
        icon: file-import
        details: 后续按分类逐步导入正式文章。
        link: /articles/
  - header: 长期笔记
    description: 把零散知识按主题收纳，优先保证可查、可扩展。
    features:
      - title: 前端体验
        icon: palette
        details: 页面结构、交互稳定性、性能和可读性。
        link: /notes/frontend.html
      - title: 工具链
        icon: screwdriver-wrench
        details: 构建、调试、脚本和自动化。
        link: /notes/tooling.html
      - title: 部署发布
        icon: cloud-arrow-up
        details: GitHub Pages、CI 和静态站点发布。
        link: /notes/deployment.html
  - header: 站点原则
    description: 参考现成框架，减少自定义组件带来的小问题。
    highlights:
      - title: 稳定
        icon: shield
        details: 导航、滚动条、卡片状态都避免布局重排。
      - title: 克制
        icon: leaf
        details: 保留玻璃质感和柔和动效，但不牺牲阅读密度。
      - title: 可迁移
        icon: code-branch
        details: 配置拆分为 theme/navbar/sidebar，后续迁移内容更轻松。
---

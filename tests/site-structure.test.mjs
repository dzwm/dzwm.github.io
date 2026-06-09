import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("blog scaffold has the expected VuePress structure and polished starter content", () => {
  const requiredFiles = [
    "package.json",
    "docs/README.md",
    "docs/.vuepress/config.ts",
    "docs/.vuepress/styles/index.scss",
    "docs/.vuepress/public/images/avatar-anime.jpg",
    "docs/posts/cms基础通关.md",
    "docs/posts/vuepress-notes.md",
  ];

  for (const file of requiredFiles) {
    assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
  }

  const home = read("docs/README.md");
  assert.match(home, /heroText:\s*.+/);
  assert.match(home, /tagline:\s*.+/);
  assert.match(home, /projects:/);

  const config = read("docs/.vuepress/config.ts");
  assert.match(config, /hostname: "https:\/\/dzwm\.github\.io"/);
  assert.match(config, /hopeTheme/);
  assert.match(config, /navbar/);
  assert.match(config, /blog/);

  const styles = read("docs/.vuepress/styles/index.scss");
  assert.match(styles, /--vp-c-accent/);
  assert.match(styles, /\.vp-hero-info/);
  assert.match(styles, /\.theme-hope-content/);
});

test("v2 interaction layer keeps navigation and cards visually stable", () => {
  const client = read("docs/.vuepress/client.ts");
  const styles = read("docs/.vuepress/styles/index.scss");
  const readme = read("README.md");

  assert.match(readme, /v1 snapshot/i);
  assert.match(client, /router\.beforeEach/);
  assert.match(client, /dzwm-route-leaving/);
  assert.doesNotMatch(client, /scrollIntoView/);
  assert.match(client, /syncBlogEnhancements/);
  assert.match(client, /dzwm-doc-tree/);
  assert.match(client, /dzwm-right-sidebar-toggle/);
  assert.match(styles, /scrollbar-gutter:\s*stable/);
  assert.match(styles, /html\s*\{/);
  assert.match(styles, /--dzwm-card-radius/);
  assert.match(styles, /\.vp-navbar/);
  assert.match(styles, /\.vp-blog-type-switcher/);
  assert.match(styles, /\.dzwm-doc-tree-panel/);
  assert.match(styles, /\.dzwm-right-sidebar-collapsed/);
  assert.match(styles, /\.vp-theme-color/);
  assert.match(styles, /\.dzwm-route-leaving/);
  assert.doesNotMatch(styles, /translateY\(-[2-9]px\)/);
});

test("v2 optimized navigation does not move the page vertically during route changes", () => {
  const client = read("docs/.vuepress/client.ts");
  const styles = read("docs/.vuepress/styles/index.scss");

  assert.match(client, /requestAnimationFrame/);
  assert.doesNotMatch(client, /behavior:\s*"smooth"/);
  assert.doesNotMatch(client, /to\.hash/);
  assert.match(styles, /--dzwm-insta-pink/);
  assert.match(styles, /--dzwm-insta-mint/);
  assert.match(styles, /\.vp-blog-hero::before/);
  assert.match(styles, /\.vp-blog-type-switcher/);
  assert.match(styles, /\.theme-container:not\(\.sidebar-open\) \.vp-sidebar/);
  assert.doesNotMatch(styles, /translate3d\(0,\s*[1-9]/);
  assert.doesNotMatch(styles, /translateY\([1-9]/);
  assert.doesNotMatch(styles, /animation:\s*dzwm-page-enter/);
});

test("v2 uses anime avatar and sakura background assets with a soft social style", () => {
  const config = read("docs/.vuepress/config.ts");
  const home = read("docs/README.md");
  const styles = read("docs/.vuepress/styles/index.scss");

  assert.match(config, /logo: "\/images\/avatar-anime\.jpg"/);
  assert.match(config, /avatar: "\/images\/avatar-anime\.jpg"/);
  assert.match(config, /rel: "icon", href: "\/images\/avatar-anime\.jpg"/);
  assert.match(home, /heroImage: \/images\/avatar-anime\.jpg/);
  assert.match(home, /bgImage: \/images\/.+/);
  assert.match(styles, /--dzwm-anime-lavender/);
  assert.match(styles, /--dzwm-sakura-pink/);
  assert.match(styles, /\.vp-blog-mask/);
  assert.match(styles, /\.vp-blog-hero-info/);
  assert.match(styles, /\.vp-blogger-avatar/);
});

test("v2 disables dark mode and uses stable paper cards with non-overlapping accents", () => {
  const config = read("docs/.vuepress/config.ts");
  const styles = read("docs/.vuepress/styles/index.scss");

  assert.match(config, /darkmode: "disable"/);
  assert.match(config, /fullscreen: false/);
  assert.match(styles, /--dzwm-paper-bg/);
  assert.match(styles, /--dzwm-corner-yellow/);
  assert.match(styles, /--dzwm-corner-pink/);
  assert.match(styles, /--dzwm-corner-blue/);
  assert.match(styles, /--dzwm-paper-edge/);
  assert.match(styles, /\.vp-project-card:nth-child\(3n \+ 1\)/);
  assert.match(styles, /\.vp-blog-hero-info::before/);
  assert.match(styles, /\.home-panel::before/);
  assert.match(styles, /\.vp-project-card::after/);
  assert.match(styles, /\.vp-article-item::after/);
  assert.match(styles, /\.vp-blogger-info::after/);
  assert.match(styles, /clip-path:\s*polygon\(100% 0,\s*0 0,\s*100% 100%\)/);
  assert.match(styles, /\.vp-article-item \.sticky-icon[\s\S]*display:\s*none/);
  assert.match(styles, /\.vp-blog-type-switcher[\s\S]*z-index:\s*2/);
  assert.doesNotMatch(styles, /--dzwm-note-/);
  assert.doesNotMatch(styles, /--dzwm-tape-/);
  assert.doesNotMatch(styles, /top:\s*-[0-9.]+rem/);
  assert.doesNotMatch(styles, /overflow:\s*visible/);
  assert.doesNotMatch(styles, /\[data-theme="dark"\]/);
  assert.doesNotMatch(styles, /backdrop-filter/);
  assert.doesNotMatch(styles, /filter:\s*[^;]*blur/);
  assert.doesNotMatch(styles, /scroll-behavior:\s*smooth/);
});

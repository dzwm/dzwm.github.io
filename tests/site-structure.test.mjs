import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

test("v3 uses the Theme Hope template-style project structure", () => {
  const requiredFiles = [
    "package.json",
    "README.md",
    "docs/README.md",
    "docs/.vuepress/config.ts",
    "docs/.vuepress/theme.ts",
    "docs/.vuepress/navbar/index.ts",
    "docs/.vuepress/navbar/zh.ts",
    "docs/.vuepress/sidebar/index.ts",
    "docs/.vuepress/sidebar/zh.ts",
    "docs/.vuepress/styles/index.scss",
    "docs/articles/README.md",
    "docs/articles/blog-start.md",
    "docs/articles/vuepress-template.md",
    "docs/notes/README.md",
    "docs/notes/frontend.md",
    "docs/notes/tooling.md",
    "docs/notes/deployment.md",
    "docs/projects/README.md",
    "docs/about/README.md",
  ];

  for (const file of requiredFiles) {
    assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
  }

  assert.equal(existsSync(join(root, "docs/posts")), false, "legacy posts folder should be replaced by v3 sections");

  const config = read("docs/.vuepress/config.ts");
  assert.match(config, /import theme from "\.\/theme\.js"/);
  assert.match(config, /viteBundler/);

  const theme = read("docs/.vuepress/theme.ts");
  assert.match(theme, /hostname: "https:\/\/dzwm\.github\.io"/);
  assert.match(theme, /navbarAutoHide: "none"/);
  assert.match(theme, /blog:\s*\{/);
  assert.match(theme, /zhNavbar/);
  assert.match(theme, /zhSidebar/);

  const navbar = read("docs/.vuepress/navbar/zh.ts");
  assert.match(navbar, /text: "首页"/);
  assert.match(navbar, /text: "文章"/);
  assert.match(navbar, /text: "笔记"/);
  assert.match(navbar, /text: "项目"/);
  assert.match(navbar, /text: "索引"/);
  assert.match(navbar, /text: "关于"/);
});

test("v3 homepage is a framework-based visual preview instead of the old blog sidebar home", () => {
  const home = read("docs/README.md");

  assert.match(home, /home: true/);
  assert.match(home, /heroText: dzwm/);
  assert.match(home, /highlights:/);
  assert.match(home, /工程实践/);
  assert.match(home, /长期笔记/);
  assert.match(home, /GitHub Pages/);
  assert.doesNotMatch(home, /layout: Blog/);
  assert.doesNotMatch(home, /layout: ProjectHome/);
});

test("v3 keeps route and layout stability rules while preserving earlier versions", () => {
  const client = read("docs/.vuepress/client.ts");
  const styles = read("docs/.vuepress/styles/index.scss");
  const readme = read("README.md");

  assert.match(readme, /v1 snapshot/i);
  assert.match(readme, /v2 snapshot/i);
  assert.match(readme, /v3/i);
  assert.match(client, /router\.beforeEach/);
  assert.match(client, /dzwm-route-leaving/);
  assert.match(styles, /scrollbar-gutter:\s*stable/);
  assert.match(styles, /html\s*\{/);
  assert.match(styles, /--dzwm-card-radius/);
  assert.match(styles, /\.vp-navbar/);
  assert.match(styles, /\.vp-nav-links/);
  assert.match(styles, /\.vp-project-card/);
  assert.match(styles, /\.dzwm-route-leaving/);
  assert.doesNotMatch(styles, /translateY\(-[1-9]/);
  assert.doesNotMatch(styles, /letter-spacing:\s*-/);
});

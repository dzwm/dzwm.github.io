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
    "docs/posts/hello-blog.md",
    "docs/posts/vuepress-notes.md",
  ];

  for (const file of requiredFiles) {
    assert.equal(existsSync(join(root, file)), true, `${file} should exist`);
  }

  const home = read("docs/README.md");
  assert.match(home, /heroText: dzwm/);
  assert.match(home, /技术笔记/);
  assert.match(home, /最近更新/);

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
  assert.match(styles, /scrollbar-gutter:\s*stable/);
  assert.match(styles, /html\s*\{/);
  assert.match(styles, /--dzwm-card-radius/);
  assert.match(styles, /\.vp-navbar/);
  assert.match(styles, /\.vp-blog-type-switcher/);
  assert.match(styles, /\.dzwm-route-leaving/);
  assert.doesNotMatch(styles, /translateY\(-[2-9]px\)/);
});

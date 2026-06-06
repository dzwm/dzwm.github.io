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

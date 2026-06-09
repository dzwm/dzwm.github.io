import { routes } from "@internal/routes";
import { defineClientConfig } from "vuepress/client";
import "./styles/index.scss";

const routeAnimationDuration = 220;
const docTreeCollapsedKey = "dzwm-doc-tree-collapsed";
const rightSidebarCollapsedKey = "dzwm-right-sidebar-collapsed";

const getStorageFlag = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
};

const setStorageFlag = (key: string, value: boolean): void => {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    // Ignore private-mode storage errors.
  }
};

const setRootFlag = (className: string, key: string, value: boolean): void => {
  document.documentElement.classList.toggle(className, value);
  setStorageFlag(key, value);
};

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] || char);

const pathToTitle = (path: string): string => {
  const filename = decodeURI(path).split("/").pop()?.replace(/\.html$/, "") || "文章";
  return filename.replace(/[-_]+/g, " ");
};

const getRouteArticleEntries = (): { category: string; title: string; href: string }[] =>
  Object.entries(routes)
    .map(([path, route]) => {
      const meta = route.meta || {};
      const category = Array.isArray(meta.category) && meta.category.length ? String(meta.category[0]) : "文章";
      const title = typeof meta.title === "string" && meta.title.trim() ? meta.title.trim() : pathToTitle(path);

      return { category, title, href: path };
    })
    .filter((entry) => entry.href.startsWith("/posts/") && entry.href.endsWith(".html"));

const getArticleEntries = (): { category: string; title: string; href: string }[] => {
  const routeEntries = getRouteArticleEntries();
  const cards = [...document.querySelectorAll<HTMLElement>(".vp-article-item")];
  const cardEntries = cards
    .map((card) => {
      const titleLink = card.querySelector<HTMLAnchorElement>('a[href*="/posts/"]');
      const category = card.querySelector<HTMLElement>(".page-category-item")?.textContent?.trim() || "文章";
      const title = titleLink?.textContent?.trim() || "";
      const href = titleLink?.getAttribute("href") || "";

      return { category, title, href };
    })
    .filter((entry) => entry.title && entry.href);

  return cardEntries.length ? cardEntries : routeEntries;
};

const renderDocTree = (tree: HTMLElement): void => {
  const entries = getArticleEntries();

  if (!entries.length) {
    tree.innerHTML = '<p class="dzwm-doc-tree-empty">当前页面暂无文章列表</p>';
    return;
  }

  const groups = new Map<string, { title: string; href: string }[]>();
  for (const entry of entries) {
    const group = groups.get(entry.category) || [];
    if (!group.some((item) => item.href === entry.href)) group.push({ title: entry.title, href: entry.href });
    groups.set(entry.category, group);
  }

  const currentPath = decodeURI(window.location.pathname);
  tree.innerHTML = [...groups]
    .map(([category, items]) => {
      const links = items
        .map((item) => {
          const href = item.href.startsWith("http") ? item.href : item.href;
          const active = decodeURI(href).includes(currentPath) || currentPath.includes(decodeURI(href));
          return `<li><a class="${active ? "active" : ""}" href="${escapeHtml(href)}">${escapeHtml(item.title)}</a></li>`;
        })
        .join("");

      return `<details open><summary>${escapeHtml(category)}</summary><ul>${links}</ul></details>`;
    })
    .join("");
};

const syncDocTree = (): void => {
  const wrapper = document.querySelector<HTMLElement>(".blog-page-wrapper");
  if (!wrapper) return;

  let panel = wrapper.querySelector<HTMLElement>(".dzwm-doc-tree-panel");
  if (!panel) {
    panel = document.createElement("aside");
    panel.className = "dzwm-doc-tree-panel";
    panel.innerHTML = `
      <button class="dzwm-doc-tree-toggle" type="button" aria-label="折叠文档树" aria-expanded="true">
        <span class="dzwm-doc-tree-toggle-icon">≡</span>
        <span class="dzwm-doc-tree-toggle-text">文档树</span>
      </button>
      <nav class="dzwm-doc-tree" aria-label="分类文档树"></nav>
    `;
    wrapper.prepend(panel);

    panel.querySelector<HTMLButtonElement>(".dzwm-doc-tree-toggle")?.addEventListener("click", () => {
      const collapsed = !document.documentElement.classList.contains("dzwm-doc-tree-collapsed");
      setRootFlag("dzwm-doc-tree-collapsed", docTreeCollapsedKey, collapsed);
      panel?.querySelector<HTMLButtonElement>(".dzwm-doc-tree-toggle")?.setAttribute("aria-expanded", String(!collapsed));
    });
  }

  const collapsed = getStorageFlag(docTreeCollapsedKey);
  document.documentElement.classList.toggle("dzwm-doc-tree-collapsed", collapsed);
  panel.querySelector<HTMLButtonElement>(".dzwm-doc-tree-toggle")?.setAttribute("aria-expanded", String(!collapsed));
  const tree = panel.querySelector<HTMLElement>(".dzwm-doc-tree");
  if (tree) renderDocTree(tree);
};

const syncRightSidebar = (): void => {
  const sidebar = document.querySelector<HTMLElement>(".vp-blog-info-wrapper");
  if (!sidebar) return;

  let toggle = sidebar.querySelector<HTMLButtonElement>(".dzwm-right-sidebar-toggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.className = "dzwm-right-sidebar-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "折叠个人侧栏");
    sidebar.prepend(toggle);

    toggle.addEventListener("click", () => {
      const collapsed = !document.documentElement.classList.contains("dzwm-right-sidebar-collapsed");
      setRootFlag("dzwm-right-sidebar-collapsed", rightSidebarCollapsedKey, collapsed);
      toggle?.setAttribute("aria-expanded", String(!collapsed));
    });
  }

  const collapsed = getStorageFlag(rightSidebarCollapsedKey);
  document.documentElement.classList.toggle("dzwm-right-sidebar-collapsed", collapsed);
  toggle.setAttribute("aria-expanded", String(!collapsed));
};

const syncBlogEnhancements = (): void => {
  syncDocTree();
  syncRightSidebar();
};

export default defineClientConfig({
  enhance({ router }) {
    if (typeof window === "undefined") return;

    document.documentElement.classList.toggle("dzwm-doc-tree-collapsed", getStorageFlag(docTreeCollapsedKey));
    document.documentElement.classList.toggle("dzwm-right-sidebar-collapsed", getStorageFlag(rightSidebarCollapsedKey));

    router.beforeEach((to, from) => {
      if (to.fullPath !== from.fullPath) {
        document.documentElement.classList.remove("dzwm-route-entered");
        document.documentElement.classList.add("dzwm-route-leaving");
      }

      return true;
    });

    router.afterEach((to, from) => {
      window.requestAnimationFrame(() => {
        if (to.path !== from.path) {
          window.scrollTo({ top: 0, left: 0 });
        }

        document.documentElement.classList.remove("dzwm-route-leaving");
        document.documentElement.classList.add("dzwm-route-entered");

        window.setTimeout(() => {
          document.documentElement.classList.remove("dzwm-route-entered");
        }, routeAnimationDuration);

        window.setTimeout(syncBlogEnhancements, 60);
      });
    });

    window.requestAnimationFrame(syncBlogEnhancements);
  },
});

import { defineClientConfig } from "vuepress/client";
import "./styles/index.scss";

const routeAnimationDuration = 220;

export default defineClientConfig({
  enhance({ router }) {
    if (typeof window === "undefined") return;

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
      });
    });
  },
});

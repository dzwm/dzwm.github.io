import { defineClientConfig } from "vuepress/client";
import "./styles/index.scss";

const routeAnimationDuration = 260;

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
      window.setTimeout(() => {
        document.documentElement.classList.remove("dzwm-route-leaving");
        document.documentElement.classList.add("dzwm-route-entered");

        window.setTimeout(() => {
          document.documentElement.classList.remove("dzwm-route-entered");
        }, routeAnimationDuration);

        if (to.hash) {
          const target = document.getElementById(decodeURIComponent(to.hash.slice(1)));
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }

        if (to.path !== from.path) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 90);
    });
  },
});

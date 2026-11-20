import { createRouter, defineRoutes, intentPreload, type RouterHistory } from "@solidjs/router";
import { AboutPage } from "./pages/AboutPage";
import { AgoraPage } from "./pages/AgoraPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { WorkPage } from "./pages/WorkPage";

export const routes = defineRoutes([
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/agora",
    component: AgoraPage,
  },
  {
    path: "/work",
    component: WorkPage,
  },
  {
    path: "/about",
    component: AboutPage,
  },
  {
    path: "/contact",
    component: ContactPage,
  },
  {
    path: "*404",
    component: NotFoundPage,
  },
]);

export function createAppRouter(history?: RouterHistory) {
  return createRouter({
    routes,
    history,
    preloadLinks: intentPreload(),
  });
}

export const AppRouter = createAppRouter();

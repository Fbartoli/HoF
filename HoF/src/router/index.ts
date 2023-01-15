import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Entry.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("../views/Admin.vue"),
    },
  ],
});

export default router;

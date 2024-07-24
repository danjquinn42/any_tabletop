import { createRouter, createWebHistory } from "vue-router";
import Map from "../components/Map.vue";
import Docs from "../components/Docs.vue";

const routes = [
  {
    path: "/",
    name: "map",
    component: Map,
  },
  {
    path: "/docs",
    name: "docs",
    component: Docs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

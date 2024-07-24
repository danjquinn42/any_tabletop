import { createRouter, createWebHistory } from "vue-router";
import Map from "../components/map/Map.vue";
import Docs from "../components/docs/About.vue";

const routes = [
  {
    path: "/",
    name: "map",
    component: Map,
  },
  {
    path: "/about",
    name: "docs",
    component: Docs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

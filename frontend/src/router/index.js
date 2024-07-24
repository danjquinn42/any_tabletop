import { createRouter, createWebHistory } from "vue-router";
import About from "../components/docs/About.vue";
import HowToPlay from "../components/docs/HowToPlay.vue";
import Map from "../components/map/Map.vue";
import Docs from "../components/docs/Docs.vue";

const index = [
  {
    path: "/",
    name: "map",
    component: Map,
  },
  {
    path: "/docs",
    name: "docs",
    component: Docs,
    children: [
      {
        path: "about",
        name: "about",
        component: About,
      },
      {
        path: "how-to",
        name: "how to",
        component: HowToPlay,
      },
      {
        path: "",
        name: "default",
        component: About,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: index,
});

export default router;

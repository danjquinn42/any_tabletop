import { createRouter, createWebHistory } from "vue-router";
import About from "../components/docs/About.vue";
import ClassesDirectory from "../components/docs/classes/ClassesDirectory.vue";
import HowToPlay from "../components/docs/howtoplay/HowToPlay.vue";
import SpeciesDirectory from "../components/docs/species/SpeciesDirectory.vue";
import StatBlocksDirectory from "../components/docs/statblocks/StatBlocksDirectory.vue";
import TheWorldDirectory from "../components/docs/theworld/TheWorldDirectory.vue";
import Map from "../components/map/Map.vue";
import Docs from "../components/docs/Docs.vue";

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
    children: [
      {
        path: "about",
        name: "about",
        component: About,
      },
      {
        path: "classes",
        name: "classes",
        component: ClassesDirectory,
      },
      {
        path: "how-to-play",
        name: "how to",
        component: HowToPlay,
      },
      {
        path: "species",
        name: "species",
        component: SpeciesDirectory,
      },
      {
        path: "statblocks",
        name: "statblocks",
        component: StatBlocksDirectory,
      },
      {
        path: "the-world",
        name: "the world",
        component: TheWorldDirectory,
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
  routes: routes,
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import About from "../components/docs/About.vue";
import Classes from "../components/docs/classes/ClassesDirectory.vue";
import HowToPlay from "../components/docs/howtoplay/HowToPlay.vue";
import Species from "../components/docs/species/SpeciesDirectory.vue";
import StatBlocks from "../components/docs/statblocks/StatBlocksDirectory.vue";
import TheWorld from "../components/docs/theworld/TheWorldDirectory.vue";
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
        component: Classes,
      },
      {
        path: "how-to-play",
        name: "how to",
        component: HowToPlay,
      },
      {
        path: "species",
        name: "species",
        component: Species,
      },
      {
        path: "statblocks",
        name: "statblocks",
        component: StatBlocks,
      },
      {
        path: "the-world",
        name: "the world",
        component: TheWorld,
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

import { createRouter, createWebHistory } from "vue-router";
import About from "../components/docs/About.vue";
import SpeciesDirectory from "../components/docs/species/SpeciesDirectory.vue";
import EditSpecies from "../components/edit/species/EditSpecies.vue";
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
        path: "species",
        name: "species",
        component: SpeciesDirectory,
      },
      {
        path: "",
        name: "docs default",
        component: About,
      },
    ],
  },
  {
    path: "/edit",
    name: "edit",
    children: [
      {
        path: "docs",
        name: "edit docs",
        component: Docs,
        children: [
          {
            path: "species/:id",
            name: "edit species",
            component: EditSpecies,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

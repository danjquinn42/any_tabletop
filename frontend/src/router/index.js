import { createRouter, createWebHistory } from "vue-router";
import About from "../components/docs/About.vue";
import CreateComponent from "../components/edit/createcomponent/CreateComponent.vue";
import EditAbilityScoreModifiers from "../components/edit/createcomponent/EditAbilityScoreModifiers.vue";
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
    ],
  },
  {
    path: "/edit",
    name: "edit",
    children: [
      {
        path: "docs",
        name: "edit docs",
        props: true,
        component: Docs,
        children: [
          {
            path: "species/:id",
            name: "edit species",
            props: true,
            component: EditSpecies,
          },
          {
            path: "game/:gameId/component/new",
            name: "create new component",
            props: true,
            component: CreateComponent,
          },
          {
            path: "game/:gameId/ScoreComponentConfig/:componentId",
            name: "edit component",
            props: true,
            component: EditAbilityScoreModifiers,
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

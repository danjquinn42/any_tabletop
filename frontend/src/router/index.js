import { createRouter, createWebHistory } from "vue-router";
import CreateComponent from "../components/edit/createcomponent/CreateComponent.vue";
import Login from "../components/Login.vue";
import Map from "../components/map/Map.vue";
import Docs from "../components/docs/Docs.vue";

const routes = [
  {
    path: "/",
    name: "map",
    component: Map,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/docs",
    name: "docs",
    component: Docs,
    children: [],
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
            path: "component/new",
            name: "create new component",
            props: true,
            component: CreateComponent,
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

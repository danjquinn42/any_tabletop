import { createRouter, createWebHistory } from "vue-router";
import Editor from "../components/editor/Editor.vue";
import Map from "../components/map/Map.vue";
import Login from "../components/Login.vue";

const routes = [
  {
    path: "/",
    name: "root",
    component: Editor,
  },
  {
    path: "/map",
    name: "map",
    component: Map,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/edit",
    name: "edit",
    children: [
      {
        path: "graph",
        name: "edit graph",
        component: Editor,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;

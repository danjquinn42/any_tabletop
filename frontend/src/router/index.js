import { createRouter, createWebHistory } from "vue-router";
import Editor from "../components/editor/Editor.vue";
import Login from "../components/Login.vue";

const routes = [
  {
    path: "/",
    name: "map",
    component: Editor,
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

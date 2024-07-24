import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router/routes";

createApp(App).use(router).mount("#app");

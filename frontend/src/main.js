import "./index.css";
import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App).use(router);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mixin({
  created() {
    // Check for login state and handle redirection
    if (window.location.search.includes("code=")) {
      // Assuming the backend handles the code exchange and session management
      window.location.href = "/";
    }
  },
});

app.mount("#app");

import "./index.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import router from "./router";
// import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

// install pinia ( must be added to the app before anything else )
const pinia = createPinia();
app.use(pinia);

// install router
app.use(router);

// Add debouce to window ResizeObserve to avoid excessive calls
// This is to prevent the error
// "ResizeObserver loop completed with undelivered notifications"
// which was seen frequently when building the form editor
const debounce = (callback, delay) => {
  let tid;
  return function (...args) {
    const ctx = self;
    tid && clearTimeout(tid);
    tid = setTimeout(() => {
      callback.apply(ctx, args);
    }, delay);
  };
};

const _resizeObserver = window.ResizeObserver;

window.ResizeObserver = class ResizeObserver extends _resizeObserver {
  constructor(callback) {
    callback = debounce(callback, 20);
    super(callback);
  }
};

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

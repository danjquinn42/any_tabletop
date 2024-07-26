<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView />
    <el-footer class="app-footer"
      ><el-text>Created by Daniel Quinn</el-text></el-footer
    >
  </el-container>
</template>

<script>
import {
  ElPageHeader,
  ElContainer,
  ElHeader,
  ElFooter,
  ElText,
} from "element-plus";
import "./index.css";
import TopNavigation from "./components/TopNavigation.vue";
import ZoomSlider from "./components/map/ZoomSlider.vue";

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

export default {
  name: "App",
  components: {
    ElText,
    TopNavigation,
    ElHeader,
    ElFooter,
    ElContainer,
    ElPageHeader,
    ZoomSlider,
  },
};
</script>
<style scoped>
a:link {
  color: #66b1ff;
}
a:visited {
  color: #3375b9;
}

.app-footer {
  background: #121212;
  margin: 8px;
  height: 16px;
  width: 100%;
  text-align: center;
}
.app-footer > * {
  color: #6c6e72;
  width: 100%;
}
</style>

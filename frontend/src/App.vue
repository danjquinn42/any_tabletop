<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView />
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
import "element-plus/es/components/descriptions/style/css";

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
<style scoped></style>

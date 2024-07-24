<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView class="app-main-content" />
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
<style>
a:link {
  color: #66b1ff;
}
a:visited {
  color: #3375b9;
}

.app-main-content {
  min-height: 80vh;
}

.app-footer {
  background: #121212;
  bottom: 0;
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

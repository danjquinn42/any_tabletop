<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <RouterView />
    <el-footer class="footer"
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
<style scoped>
.footer {
  background: #121212;
  bottom: 0;
  margin: 8px;
  height: 16px;
  width: 100%;
  text-align: center;
}
.footer > * {
  color: #6c6e72;
  width: 100%;
}
</style>

<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import "element-plus/es/components/page-header/style/css";
import {
  ElPageHeader,
  ElButton,
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElText,
  ElSubMenu,
} from "element-plus";
import "./index.css";
import TopNavigation from "./components/TopNavigation.vue";
import ZoomSlider from "./components/ZoomSlider.vue";

export default {
  name: "App",
  components: {
    ElText,
    TopNavigation,
    ElMain,
    ElSubMenu,
    ElMenuItem,
    ElMenu,
    ElHeader,
    ElFooter,
    ElContainer,
    ElButton,
    ElPageHeader,
    ZoomSlider,
  },
};
</script>

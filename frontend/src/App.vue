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

h1 {
  font-size: 1.8rem;
  font-weight: 600;
}
h2 {
  font-size: 1.5rem;
  font-weight: 600;
  font-style: italic;
}
h3 {
  font-size: 1.5rem;
  font-weight: 400;
}
h4 {
  font-size: 1.3rem;
  font-weight: 400;
  font-style: italic;
}

p {
  font-size: small;
}

article {
  font-size: small;
}
</style>

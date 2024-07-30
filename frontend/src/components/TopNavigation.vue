<template>
  <el-menu :default-active="$router.path" mode="horizontal" router>
    <el-text size="large" class="title">Ada</el-text>
    <el-image class="map-icon" src="/assets/favicon.png"></el-image>
    <el-text size="large"></el-text>
    <el-menu-item index="/">Map</el-menu-item>
    <el-sub-menu index="docs-menu"
      ><template #title>Docs</template>
      <el-menu-item index="/docs/about">About</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/edit/component/new">Create</el-menu-item>
  </el-menu>
</template>

<script>
import "element-plus/theme-chalk/el-menu.css";
import "element-plus/theme-chalk/el-menu-item.css";
import "element-plus/theme-chalk/el-sub-menu.css";
import { ElMenu, ElMenuItem, ElImage, ElSubMenu, ElText } from "element-plus";

export default {
  name: "top-navigation",
  components: { ElImage, ElText, ElSubMenu, ElMenuItem, ElMenu },
  data: function () {
    return {};
  },
};
</script>

<style>
.title {
  font-weight: bold;
}

.map-icon {
  margin: 16px;
  width: 24px;
  height: 24px;
}
</style>

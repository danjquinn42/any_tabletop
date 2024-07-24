<template>
  <el-menu
    :default-active="$router.path"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    router
  >
    <el-text size="large" class="title">Ada</el-text>
    <el-image class="map-icon" src="../assets/favicon.png"></el-image>
    <el-text size="large"></el-text>
    <el-menu-item index="/">Map</el-menu-item>
    <el-sub-menu index="docs-menu"
      ><template #title>Docs</template>
      <el-menu-item index="about">About</el-menu-item>
      <el-menu-item disabled index="docs/how-to">How to play</el-menu-item>
      <el-menu-item disabled index="docs/species">Species</el-menu-item>
      <el-menu-item disabled index="docs/classes">Classes</el-menu-item>
      <el-menu-item disabled index="docs/statblocks">Stat Blocks</el-menu-item>
      <el-sub-menu disabled index="about">
        <template #title>About the World</template>
        <el-menu-item index="history">History</el-menu-item>
        <el-menu-item index="organizations">Organizations</el-menu-item>
        <el-menu-item index="lore">Lore</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="play" disabled>Play</el-menu-item>
    <el-menu-item index="mods" disabled>Mods</el-menu-item>
  </el-menu>
</template>

<script>
import { ElMenu, ElMenuItem, ElImage, ElSubMenu, ElText } from "element-plus";

export default {
  name: "top-navigation",
  components: { ElImage, ElText, ElSubMenu, ElMenuItem, ElMenu },
  data: function () {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
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

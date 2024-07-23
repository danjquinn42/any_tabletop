<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="map">Map of Ada</el-menu-item>
    <el-sub-menu index="docs">
      <template #title>Docs</template>
      <el-menu-item index="how-to">How to play</el-menu-item>
      <el-menu-item index="species">Species</el-menu-item>
      <el-menu-item index="classes">Classes</el-menu-item>
      <el-menu-item index="statblocks">Stat Blocks</el-menu-item>
      <el-sub-menu index="about">
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
import { ElMenu, ElMenuItem, ElSubMenu } from "element-plus";
import { ref } from "vue";

export default {
  name: "top-navigation",
  components: { ElSubMenu, ElMenuItem, ElMenu },
  data: function () {
    return {
      activeIndex: ref("1"),
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style></style>

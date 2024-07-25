<template>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="$router.path" mode="vertical" router>
        <el-menu-item :index="getRoute('about')">
          <template #title>About</template>
        </el-menu-item>
        <el-menu-item :index="getRoute('how-to-play')">
          <template #title>How To Play</template>
        </el-menu-item>
        <el-menu-item :index="getRoute('species')">
          <template #title>Species</template>
        </el-menu-item>
        <el-menu-item :index="getRoute('classes')">
          <template #title>Classes</template>
        </el-menu-item>
        <el-menu-item :index="getRoute('statblocks')"
          ><template #title>Statblocks</template></el-menu-item
        >
        <el-menu-item index="the-world">
          <template #title>The World</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<script>
import "element-plus/theme-chalk/el-menu.css";
import "element-plus/theme-chalk/el-menu-item.css";
import "element-plus/theme-chalk/el-sub-menu.css";
import {
  ElMain,
  ElAside,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElScrollbar,
} from "element-plus";

export default {
  name: "Docs",
  data: function () {
    return {
      isEditMode: this.$route.matched[0].name === "edit",
    };
  },
  methods: {
    getRoute(index) {
      return this.isEditMode ? `/edit/docs/${index}/new` : index;
    },
  },
  components: { ElMenuItem, ElMenu, ElScrollbar, ElAside, ElMain, ElContainer },
};
</script>

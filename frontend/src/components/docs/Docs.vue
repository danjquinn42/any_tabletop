<template>
  <el-container>
    <el-aside width="auto">
      <el-menu :default-active="$router.path" mode="vertical" router>
        <el-menu-item :index="getRoute('about')">
          <template #title>About</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-scrollbar class="scroll" always>
      <el-main class="main">
        <RouterView />
      </el-main>
    </el-scrollbar>
  </el-container>
</template>
<script>
import "element-plus/theme-chalk/el-menu.css";
import "element-plus/theme-chalk/el-menu-item.css";
import "element-plus/theme-chalk/el-sub-menu.css";
import {
  ElMain,
  ElAside,
  ElButton,
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
  components: {
    ElButton,
    ElMenuItem,
    ElMenu,
    ElScrollbar,
    ElAside,
    ElMain,
    ElContainer,
  },
};
</script>
<style>
.main {
  width: 100%;
}
.scroll {
  width: 100%;
  justify-content: left;
  align-self: flex-start;
  height: 100vh;
  margin-right: 16px;
  margin-bottom: 1600px;
  background: var(--el-color-primary-light-9);
}
</style>

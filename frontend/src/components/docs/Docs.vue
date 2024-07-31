<template>
  <el-container
    class="container"
    v-loading="loadingStatus"
    element-loading-text="Loading..."
  >
    <el-aside width="auto">
      <el-menu :default-active="$router.path" mode="vertical" router>
        <el-menu-item :index="getRoute('about')">
          <template #title>About</template>
        </el-menu-item>
        <el-sub-menu v-for="game in mod.games" :index="game.name">
          <template #title>{{ game.name }}</template>
          <el-menu-item :index="getRoute(`game/${game.id}`)"
            >About</el-menu-item
          >
          <el-sub-menu :index="game.name + 'components'">
            <template #title>Components</template>
            <el-menu-item :index="getRoute(`game/${game.id}/component/new`)"
              >Create New Component</el-menu-item
            >
            <el-menu-item
              v-for="comp in game.configs"
              :index="getRoute(`game/${game.id}/${comp.label}/${comp.id}`)"
              >{{ comp.name }}</el-menu-item
            >
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-scrollbar class="scroll" always>
      <el-main class="main">
        <RouterView :key="$route.fullPath" :mod="mod" />
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
  ElLoading,
  ElSubMenu,
} from "element-plus";
import { getAllModsChildren } from "../../api/mod";

export default {
  name: "Docs",
  data: function () {
    return {
      isEditMode: this.$route.matched[0].name === "edit",
      loadingStatus: true,
      mod: {},
    };
  },
  methods: {
    getRoute(index) {
      return this.isEditMode ? `/edit/docs/${index}` : index;
    },
    async fetchGames() {
      function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      this.mod = await getAllModsChildren();
      console.log(this.mod);
      await timeout(1000);
    },
  },
  mounted() {
    this.fetchGames().then(() => {
      this.loadingStatus = false;
    });
  },
  components: {
    ElSubMenu,
    ElButton,
    ElMenuItem,
    ElMenu,
    ElScrollbar,
    ElAside,
    ElMain,
    ElContainer,
  },
  directives: {
    loading: ElLoading.directive,
  },
};
</script>
<style scoped>
.main {
  width: 100%;
}

.container {
  width: 100%;
  height: 100vh;
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

<template>
  <el-container
      class="container"
  >
    <el-aside width="auto">
      <el-menu :default-active="$router.path" mode="vertical" router>
        <el-menu-item :index="getRoute('about')">
          <template #title>About</template>
        </el-menu-item>
        <el-sub-menu v-for="game in modStore.games" :index="game.name">
          <template #title>{{ game.name }}</template>
          <el-menu-item :index="getRoute(`game/${game.id}`)"
          >About
          </el-menu-item
          >
          <el-sub-menu :index="game.name + 'components'">
            <template #title>Components</template>
            <el-menu-item :index="getRoute(`game/${game.id}/component/new`)"
            >Create New Component
            </el-menu-item
            >
            <el-menu-item
                v-for="compId in game.configIds"
                :index="getRoute(`game/${game.id}/component/${compId}`)"
            >{{ modStore.components[compId].name }}
            </el-menu-item
            >
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-scrollbar class="scroll" always>
      <el-main class="main">
        <RouterView :key="$route.fullPath"/>
      </el-main>
    </el-scrollbar>
  </el-container>
</template>
<script>
import "element-plus/theme-chalk/el-menu.css";
import "element-plus/theme-chalk/el-menu-item.css";
import "element-plus/theme-chalk/el-sub-menu.css";
import {useModStore} from "../../store/modStore";
import {
  ElMain,
  ElAside,
  ElButton,
  ElContainer,
  ElMenu,
  ElMenuItem,
  ElScrollbar,
  ElSubMenu,
} from "element-plus";

export default {
  name: "Docs",
  data: function () {
    return {
      isEditMode: this.$route.matched[0].name === "edit",
    };
  },
  setup() {
    const modStore = useModStore();
    return {modStore};
  },
  methods: {
    getRoute(index) {
      return this.isEditMode ? `/edit/docs/${index}` : index;
    },
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

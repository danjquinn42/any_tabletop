<template>
  <el-container
      class="container"
  >
    <el-header class="header">

      <el-menu class="menu" :default-active="$router.path" mode="horizontal" router>
        <el-menu-item
            class="menu-item"
            :index="getRoute(`component/new`)"
        >Components
        </el-menu-item>
        <el-menu-item
            class="menu-item"
        >Games
        </el-menu-item>
      </el-menu>
    </el-header>
    <!--    <el-aside>-->
    <!--    </el-aside>-->
      <el-main class="main">
    <el-scrollbar class="scroll" always>
        <RouterView :key="$route.fullPath"/>
    </el-scrollbar>
      </el-main>
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
  ElHeader
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
    ElHeader,
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

.header {
  height: fit-content;
  padding-bottom: 0;
}

.menu {
  height: 3rem;
}

.menu-item {
  font-size: 0.8rem;
  padding: 0.8rem;
  font-weight: normal;
}

.main {
  width: 100%;
  padding-top: 0;
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

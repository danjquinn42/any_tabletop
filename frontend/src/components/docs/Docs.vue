<template>
  <el-container>
    <el-aside width="200px">
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="About">
            <template #title>About</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
<script>
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
  components: { ElMenuItem, ElMenu, ElScrollbar, ElAside, ElMain, ElContainer },
};
</script>

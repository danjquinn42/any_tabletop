<template>
  <el-container>
    <el-aside width="200px">
      <!--      <el-scrollbar>-->
      <el-menu :default-active="$router.path" mode="vertical" router>
        <el-menu-item index="about"> About </el-menu-item>
        <el-menu-item index="how-to-play">
          <template #title>How To Play</template>
        </el-menu-item>
        <el-menu-item index="species">
          <template #title>Species</template>
        </el-menu-item>
        <el-menu-item index="classes">
          <template #title>Classes</template>
        </el-menu-item>
        <el-menu-item index="statblocks"> Statblocks </el-menu-item>
        <el-menu-item index="the-world">
          <template #title>The World</template>
        </el-menu-item>
      </el-menu>
      <!--      </el-scrollbar>-->
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

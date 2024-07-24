<template>
  <el-scrollbar class="scroll" always>
    <Species class="species"></Species>
  </el-scrollbar>
</template>

<script>
import "element-plus/theme-chalk/el-scrollbar.css";
import { ElText, ElScrollbar } from "element-plus";
import Species from "./Species.vue";

export default {
  name: "SpeciesDirectory",
  components: { ElScrollbar, ElText, Species },
};
</script>

<style scoped>
.scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  padding-right: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.species {
  margin: 64px 16px;
}
</style>

<template>
  <el-scrollbar class="scroll" always>
    <Species :template="template" :data="speciesData" class="species"></Species>
  </el-scrollbar>
</template>

<script>
import "element-plus/theme-chalk/el-scrollbar.css";
import { ElText, ElScrollbar } from "element-plus";
import { MOCK_DATA, MOCK_TEMPLATES } from "../../../util/serverDataMocks";
import Species from "./Species.vue";

export default {
  name: "SpeciesDirectory",
  components: { ElScrollbar, ElText, Species },
  data: function () {
    return {
      template: MOCK_TEMPLATES.species,
      speciesData: MOCK_DATA.species.luchog,
    };
  },
};
</script>

<style scoped>
.scroll {
  display: flex;
  align-items: center;
  justify-content: left;
  align-self: flex-start;
  height: 90vh;
  padding-right: 16px;
  margin-bottom: 16px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.species {
  margin: 64px 16px;
  max-width: 1500px;
}
</style>

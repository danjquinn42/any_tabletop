<template>
  <el-main>
    <el-header>Create New Component</el-header>

    <el-card class="preview-container" @click="createCoreStatsVisible = true">
      <template #header><span>Scores And Modifiers</span></template>
      <div class="preview">
        <AbilityScoreModifiers
          display-sign
          class="preview"
          :stats="exampleCoreStats"
        />
      </div>
    </el-card>
  </el-main>

  <el-dialog
    width="95%"
    v-model="createCoreStatsVisible"
    title="Scores And Modifiers"
  >
    <EditAbilityScoreModifiers :on-submit="createStatsConfig" />
  </el-dialog>
</template>

<script>
import { ElButton, ElCard, ElDialog, ElHeader, ElMain } from "element-plus";
import "element-plus/es/components/descriptions/style/css";
import { map } from "lodash";
import { createStatsConfigComponent } from "../../../api/component";
import EditAbilityScoreModifiers from "./EditAbilityScoreModifiers.vue";
import AbilityScoreModifiers from "./AbilityScoreModifiers.vue";

export default {
  name: "CreateComponent",
  components: {
    EditAbilityScoreModifiers,
    ElDialog,
    ElHeader,
    ElMain,
    ElCard,
    AbilityScoreModifiers,
    ElButton,
  },
  data: function () {
    return {
      exampleCoreStats: {
        STR: {
          label: "STR",
          value: 16,
        },
        DEX: {
          label: "DEX",
          value: 14,
        },
        CON: {
          label: "CON",
          value: 16,
        },
        INT: {
          label: "INT",
          value: 8,
        },
        WIS: {
          label: "WIS",
          value: 10,
        },
        CHA: {
          label: "CHA",
          value: 8,
        },
      },
      createCoreStatsVisible: false,
    };
  },
  methods: {
    statsAsList() {
      return map(this.stats, (v) => v);
    },
    async createStatsConfig(config) {
      await createStatsConfigComponent(config);
      this.createCoreStatsVisible = false;
    },
  },
};
</script>

<style scoped>
.preview-container {
  margin: 1rem auto;
  align-self: center;
  min-width: 15rem;
  max-width: 20rem;
}

.preview-container:hover {
  border-color: var(--el-color-primary);
}

.preview {
  zoom: 0.7;
  place-content: center;
}
</style>

<template>
  <el-main>
    <el-header>Create New Component</el-header>

    <el-card class="preview-container" @click="createCoreStatsVisible = true">
      <template #header><span>Ability Scores Modifiers</span></template>
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
    v-model="createCoreStatsVisible"
    title="Create Stats With Derived Values"
  >
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="createCoreStatsVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createCoreStatsVisible = false">
          Create
        </el-button>
      </div>
    </template>
  </el-dialog>

  <EditAbilityScoreModifiers />
</template>

<script>
import { ElButton, ElCard, ElDialog, ElHeader, ElMain } from "element-plus";
import "element-plus/es/components/descriptions/style/css";
import { map } from "lodash";
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

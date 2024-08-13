<template>
  <el-card class="preview-container" @click="createCoreStatsVisible = true">
    <template #header><span>Scores And Modifiers</span></template>
    <div class="preview">
      <slot></slot>
    </div>
    <template #footer>
      <p>{{ description }}</p>
    </template>
  </el-card>

  <el-dialog
    width="95%"
    style="max-width: 1400px"
    v-model="createCoreStatsVisible"
    title="Scores And Modifiers"
  >
    <EditAbilityScoreModifiers
      :closeDialog="() => (createCoreStatsVisible = !createCoreStatsVisible)"
    />
  </el-dialog>
</template>
<script>
import { ElCard, ElDialog } from "element-plus";
import AbilityScoreModifiers from "../AbilityScores/AbilityScoreModifiers.vue";
import EditAbilityScoreModifiers from "../AbilityScores/EditAbilityScoreModifiers.vue";

export default {
  name: "ComponentPreviewCard",
  components: {
    EditAbilityScoreModifiers,
    ElDialog,
    ElCard,
    AbilityScoreModifiers,
  },
  props: {
    description: {
      type: String,
    },
  },
  data: function () {
    return {
      createCoreStatsVisible: false,
    };
  },
};
</script>
<style scoped>
.preview-container {
  margin: 1rem;
  min-width: 14rem;
  max-width: 20rem;
  align-self: normal;
}

.preview-container:hover {
  border-color: var(--el-color-primary);
}

.preview {
  zoom: 0.6;
}
</style>

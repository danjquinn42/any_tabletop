<template>
  <el-card class="preview-container" @click="createCoreStatsVisible = true">
    <template #header><span>New Component From Scratch</span></template>
    <div class="preview">
    </div>
    <template #footer>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi semper ante vitae tortor placerat pulvinar.
        Suspendisse et odio quis eros pharetra maximus eget vitae est. Donec sollicitudin, orci at elementum egestas,
        diam erat faucibus justo, eu fringilla mi tellus sed nibh. Ut blandit eleifend sapien nec vulputate. Donec
        pharetra blandit felis in luctus. In vitae eros vitae neque scelerisque aliquam.</p>
    </template>
  </el-card>

  <el-dialog
      width="95%"
      style="max-width: 1400px"
      v-model="visible"
  >
    <NewComponent :on-submit="createStatsConfig"/>
  </el-dialog>
</template>
<script>
import {ElCard, ElDialog} from "element-plus";
import {createStatsConfigComponent} from "../../../api/component";
import AbilityScoreModifiers from "./AbilityScoreModifiers.vue"
import EditAbilityScoreModifiers from "./EditAbilityScoreModifiers.vue";
import NewComponent from "./NewComponent.vue";

export default {
  name: 'NewComponentPreview',
  components: {NewComponent, EditAbilityScoreModifiers, ElDialog, ElCard, AbilityScoreModifiers},
  props: {
  },
  data: function() {
    return {
      visible: false,
    }
  },
  methods: {
    async createStatsConfig(config) {
      const gameId = this.$route.params.gameId;
      await createStatsConfigComponent(config, gameId);
      this.createCoreStatsVisible = false;
    },
  }
}
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
  max-width: 90%;
}
</style>
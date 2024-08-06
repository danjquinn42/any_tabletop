<template>
  <el-main class="main">
    <ComponentPreviewCard/>

    <NewComponentPreview/>

  </el-main>
</template>

<script>
import {ElCard, ElDialog, ElMain} from "element-plus";
import "element-plus/es/components/descriptions/style/css";
import {map} from "lodash";
import ComponentPreviewCard from "./ComponentPreviewCard.vue";
import EditAbilityScoreModifiers from "./EditAbilityScoreModifiers.vue";
import NewComponentPreview from "./NewComponentPreview.vue";

export default {
  name: "CreateComponent",
  components: {
    NewComponentPreview,
    ComponentPreviewCard,
    EditAbilityScoreModifiers,
    ElDialog,
    ElMain,
    ElCard,

  },
  methods: {
    statsAsList() {
      return map(this.stats, (v) => v);
    },
  },
};
</script>

<style scoped>

.main {
  width: 100%;
  height: 100%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(auto-fill, 20rem);
  flex-flow: wrap;
  padding: 0;
}
</style>

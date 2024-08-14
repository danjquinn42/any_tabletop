<template>
  <el-affix>
    <div class="at-flow-switch-container">
      <el-radio-group size="small" v-model="modelView">
        <el-radio-button label="Graph" value="graph" />
        <el-radio-button label="Input" value="form" />
        <el-radio-button label="Output" value="display" />
      </el-radio-group>
    </div>
  </el-affix>

  <!-- GRAPH VIEW  -->
  <div v-if="modelView === 'graph'">
    <GraphView :node-types="nodeTypes" />
  </div>

  <!-- TEMPLATE VIEW  -->
  <TemplateView
    :template-types="templateTypes"
    v-if="modelView !== 'graph'"
    :model-view="modelView"
  ></TemplateView>
</template>

<script>
import { ElAffix, ElRadioButton, ElRadioGroup } from "element-plus";
import { markRaw } from "vue";
import { useGraphStore } from "../../store/graphStore";
import GraphView from "./GraphView.vue";
import DisplayNumberNode from "./nodes/display/DisplayNumberNode.vue";
import DisplayStringNode from "./nodes/display/DisplayStringNode.vue";
import InputNode from "./nodes/input/InputNode.vue";
import InputNumberMapNode from "./nodes/input/InputNumberMapNode.vue";
import InputNumberNode from "./nodes/input/InputNumberNode.vue";
import FormulaNode from "./nodes/transform/FormulaNode.vue";
import DisplayNumberTemplate from "./templatecomponents/DisplayNumberTemplate.vue";
import DisplayStringTemplate from "./templatecomponents/DisplayStringTemplate.vue";
import InputNumberMapTemplate from "./templatecomponents/InputNumberMapTemplate.vue";
import InputNumberTemplate from "./templatecomponents/InputNumberTemplate.vue";
import InputStringTemplate from "./templatecomponents/InputStringTemplate.vue";
import TemplateView from "./TemplateView.vue";

export default {
  name: "Editor",
  components: {
    GraphView,
    TemplateView,
    ElAffix,
    ElRadioButton,
    ElRadioGroup,
  },
  data: function () {
    return {
      modelView: "graph",
    };
  },
  setup() {
    const graphStore = useGraphStore();
    // TODO remove local storage
    graphStore.loadLocally();

    graphStore.logGraphs();
    const nodeTypes = {
      input: markRaw(InputNode),
      inputNumber: markRaw(InputNumberNode),
      displayNumber: markRaw(DisplayNumberNode),
      displayString: markRaw(DisplayStringNode),
      applyFormula: markRaw(FormulaNode),
      inputNumberMap: markRaw(InputNumberMapNode),
    };

    const templateTypes = {
      input: markRaw(InputStringTemplate),
      inputNumber: markRaw(InputNumberTemplate),
      displayNumber: markRaw(DisplayNumberTemplate),
      displayString: markRaw(DisplayStringTemplate),
      inputNumberMap: markRaw(InputNumberMapTemplate),
    };

    return {
      nodeTypes,
      templateTypes,
    };
  },
};
</script>

<style scoped>
.at-flow-switch-container {
  padding: 1rem;
  position: fixed;
}
</style>

<template>
  <el-affix>
    <div class="at-flow-switch-container">
      <el-radio-group size="small" v-model="modelView">
        <el-radio-button label="Graph" value="graph"/>
        <el-radio-button label="Input" value="form"/>
        <el-radio-button label="Output" value="display"/>
      </el-radio-group>
    </div>
  </el-affix>

  <!-- GRAPH VIEW  -->
  <div v-if="modelView === 'graph'">
    <GraphView :node-types="nodeTypes" :on-connect="onConnect"/>
  </div>


  <!-- TEMPLATE VIEW  -->
  <TemplateView :template-types="templateTypes" v-if="modelView !== 'graph'" :model-view="modelView"></TemplateView>
</template>

<script>
import {useVueFlow} from '@vue-flow/core';
import {ElAffix, ElRadioButton, ElRadioGroup} from "element-plus";
import {cloneDeep} from "lodash";
import {markRaw} from 'vue';
import {useGraphStore} from "../../store/graphStore";
import GraphView from "./GraphView.vue";
import DisplayNumberNode from "./nodes/display/DisplayNumberNode.vue";
import DisplayStringNode from "./nodes/display/DisplayStringNode.vue";
import InputNode from "./nodes/input/InputNode.vue";
import InputNumberNode from "./nodes/input/InputNumberNode.vue";
import FormulaNode from "./nodes/transform/FormulaNode.vue";
import DisplayNumberTemplate from "./templatecomponents/DisplayNumberTemplate.vue";
import DisplayStringTemplate from "./templatecomponents/DisplayStringTemplate.vue";
import InputNumberTemplate from "./templatecomponents/InputNumberTemplate.vue";
import InputStringTemplate from "./templatecomponents/InputStringTemplate.vue";
import TemplateView from "./TemplateView.vue";

export default {
  name: 'Editor',
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
    const {addEdges, findNode, updateNodeData, toObject, onEdgesChange, onNodesChange} = useVueFlow();

    graphStore.logGraphs();
    const nodeTypes = {
      input: markRaw(InputNode),
      inputNumber: markRaw(InputNumberNode),
      displayNumber: markRaw(DisplayNumberNode),
      displayString: markRaw(DisplayStringNode),
      applyFormula: markRaw(FormulaNode),
    };

    const templateTypes = {
      input: markRaw(InputStringTemplate),
      inputNumber: markRaw(InputNumberTemplate),
      displayNumber: markRaw(DisplayNumberTemplate),
      displayString: markRaw(DisplayStringTemplate),
    };

    function onConnect(params) {
      params.arrowHeadType = 'arrow';
      params.markerEnd = {type: 'arrow'};
      addEdges(params);
      const source = findNode(params.source);
      const target = findNode(params.target);
      if (source && target && source.data) {
        const sourceData = source.data.nodeData;
        sourceData.addChild(target.id);
        updateNodeData(source.id, {nodeData: sourceData});

        const targetData = target.data.nodeData;
        targetData.setInput(sourceData.getOutput())
        updateNodeData(target.id, {nodeData: targetData});
      }
    }

    onNodesChange(() => {
      graphStore.storeLocally(toObject());
    })

    onEdgesChange((change) => {
      change.forEach(c => {
        if (c.type === "remove") {
          const source = findNode(c.source);
          const target = findNode(c.target);
          const sourceWithoutTarget = source.data.nodeData.withoutChild(c.target);
          updateNodeData(c.target, {nodeData: cloneDeep(target.data.nodeData)})
          updateNodeData(c.source, {nodeData: sourceWithoutTarget})
        }
      })
      graphStore.storeLocally(toObject());
    });

    return {
      nodeTypes,
      templateTypes,
      onConnect,
    };
  },
};
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

/* WARNING: styles are NOT scoped to this component
Be sure to use specific and uncommon class names*/

.at-flow-switch-container {
  padding: 1rem;
  position: fixed;
}
</style>

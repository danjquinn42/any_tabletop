<template>
  <el-container class="dnd-flow" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <el-aside>
      <Sidebar/>
    </el-aside>
    <el-main>
      <VueFlow
          class="at-flow"
          :node-types="nodeTypes"
          v-model:nodes="graphStore.graphs.onlyGraph.nodes"
          v-model:edges="graphStore.graphs.onlyGraph.edges"
          edge-types="arrowclosed"
          @connect="onConnect"
      >
        <DropzoneBackground
            :style="{
            backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
            transition: 'background-color 0.2s ease',
          }"
        >
        </DropzoneBackground>
      </VueFlow>
    </el-main>
  </el-container>
</template>

<script>
import {ElAside, ElContainer, ElMain} from "element-plus";
import {cloneDeep} from "lodash";
import {markRaw} from 'vue';
import {VueFlow, useVueFlow} from '@vue-flow/core';
import DropzoneBackground from "./DropzoneBackground.vue";
import DisplayNumberNode from "./nodes/DisplayNumberNode.vue";
import DisplayStringNode from "./nodes/DisplayStringNode.vue";
import FormulaNode from "./nodes/FormulaNode.vue";
import InputNode from "./nodes/InputNode.vue";
import InputNumberNode from "./nodes/InputNumberNode.vue";
import Sidebar from "./Sidebar.vue";
import useDragAndDrop from './useDnD';
import {useGraphStore} from "../../store/graphStore";

export default {
  name: 'Graph',
  components: {
    ElAside,
    ElContainer,
    ElMain,
    VueFlow,
    DropzoneBackground,
    DisplayNumberNode,
    InputNumberNode,
    Sidebar,
  },
  setup() {
    const graphStore = useGraphStore();
    const {addEdges, findNode, updateNodeData, onEdgesChange} = useVueFlow();
    const {onDragOver, onDrop, onDragLeave, isDragOver} = useDragAndDrop();

    const nodeTypes = {
      input: markRaw(InputNode),
      inputNumber: markRaw(InputNumberNode),
      displayNumber: markRaw(DisplayNumberNode),
      displayString: markRaw(DisplayStringNode),
      applyFormula: markRaw(FormulaNode),
    };

    function onConnect(params) {
      params.arrowHeadType = 'arrow';
      params.markerEnd = {type: 'arrow'};
      console.log(params);
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
    });

    return {
      graphStore,
      nodeTypes,
      isDragOver,
      onDragOver,
      onDrop,
      onDragLeave,
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

.at-flow {
  width: 100%;
  height: 100vh;
}

/* selector is used */
.vue-flow__edge-path {
  stroke-width: 0.15rem;
  stroke: var(--el-color-info);
}

/* selector is used */
.vue-flow__edge.selected .vue-flow__edge-path {
  stroke-width: 0.2rem;
  stroke: var(--el-color-warning-dark-2);
}
</style>

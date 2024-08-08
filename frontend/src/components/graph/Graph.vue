<template>
  <el-container class="dnd-flow" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <el-aside>
      <Sidebar/>
    </el-aside>
    <el-main>
      <VueFlow
          class="flow"
          :node-types="nodeTypes"
          :nodes="nodes"
          :edges="edges"
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
import {ref, markRaw} from 'vue';
import {VueFlow, useVueFlow} from '@vue-flow/core';
import DropzoneBackground from "./DropzoneBackground.vue";
import DisplayNumberNode from "./nodes/DisplayNumberNode.vue";
import InputNumberNode from "./nodes/InputNumberNode.vue";
import Sidebar from "./Sidebar.vue";
import useDragAndDrop from './useDnD';

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
    const {addEdges, findNode, updateNodeData, onEdgesChange} = useVueFlow();
    const {onDragOver, onDrop, onDragLeave, isDragOver} = useDragAndDrop();

    const nodes = ref([]);
    const edges = ref([]);

    const nodeTypes = {
      inputNumber: markRaw(InputNumberNode),
      displayNumber: markRaw(DisplayNumberNode),
    };

    function onConnect(params) {
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
      edges,
      nodes,
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

<style scoped>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.flow {
  width: 100%;
  height: 100vh;
}
</style>

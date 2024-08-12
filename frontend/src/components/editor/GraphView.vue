<template>
  <el-container class="dnd-flow" @drop="onDrop" @dragover="onDragOver" @dragleave="onDragLeave">
    <GraphSidebar/>
    <el-main class="at-flow-main">
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
import {VueFlow} from "@vue-flow/core";
import {ElContainer, ElMain} from "element-plus";
import DropzoneBackground from "./DropzoneBackground.vue"
import GraphSidebar from "./GraphSidebar.vue"
import {useGraphStore} from "../../store/graphStore";
import useDragAndDrop from "./useDnD";
export default {
  name: 'GraphView',
  components: {VueFlow, ElMain, ElContainer, DropzoneBackground, GraphSidebar},
  setup() {
    const graphStore = useGraphStore();
    const {onDragOver, onDrop, onDragLeave, isDragOver} = useDragAndDrop();

    return { graphStore, onDragOver, onDrop, onDragLeave, isDragOver }
  },
  props: {
    nodeTypes: {},
    onConnect: {},
  }
}
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

.at-flow-main {
  padding-left: 0.5rem;
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
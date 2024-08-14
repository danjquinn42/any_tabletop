<template>
  <el-container
    class="dnd-flow"
    @drop="onDrop"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
  >
    <GraphSidebar />
    <el-main class="at-flow-main">
      <VueFlow
        class="at-flow"
        :node-types="nodeTypes"
        v-model:nodes="graphStore.graphs.onlyGraph.nodes"
        v-model:edges="graphStore.graphs.onlyGraph.edges"
        edge-types="arrowclosed"
        @connect="onConnect"
        :default-viewport="{ zoom: 0.8 }"
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
import { useVueFlow, VueFlow } from "@vue-flow/core";
import { ElContainer, ElMain } from "element-plus";
import { cloneDeep } from "lodash";
import DropzoneBackground from "./DropzoneBackground.vue";
import GraphSidebar from "./GraphSidebar.vue";
import { useGraphStore } from "../../store/graphStore";
import useDragAndDrop from "./useDnD";
export default {
  name: "GraphView",
  components: {
    VueFlow,
    ElMain,
    ElContainer,
    DropzoneBackground,
    GraphSidebar,
  },
  setup() {
    const graphStore = useGraphStore();
    const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();
    const {
      addEdges,
      findNode,
      updateNodeData,
      toObject,
      onEdgesChange,
      onNodesChange,
    } = useVueFlow();

    function onConnect(params) {
      params.arrowHeadType = "arrow";
      params.markerEnd = { type: "arrow" };
      addEdges(params);
      const source = findNode(params.source);
      const target = findNode(params.target);
      if (source && target && source.data) {
        const sourceData = source.data.nodeData;
        sourceData.addChild(target.id);
        updateNodeData(source.id, { nodeData: sourceData });

        const targetData = target.data.nodeData;
        targetData.setInputValue(sourceData.getOutputValue());
        updateNodeData(target.id, { nodeData: targetData });
      }
    }

    onNodesChange(() => {
      graphStore.storeLocally(toObject());
    });

    onEdgesChange((change) => {
      change.forEach((c) => {
        if (c.type === "remove") {
          const source = findNode(c.source);
          const target = findNode(c.target);
          const sourceWithoutTarget = source.data.nodeData.withoutChild(
            c.target,
          );
          updateNodeData(c.target, {
            nodeData: cloneDeep(target.data.nodeData),
          });
          updateNodeData(c.source, { nodeData: sourceWithoutTarget });
        }
      });
      graphStore.storeLocally(toObject());
    });

    return {
      graphStore,
      onDragOver,
      onDrop,
      onDragLeave,
      isDragOver,
      onConnect,
    };
  },
  props: {
    nodeTypes: {},
  },
};
</script>
<style>
@import "@vue-flow/core/dist/style.css";
@import "@vue-flow/core/dist/theme-default.css";

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

.vue-flow__node-input,
.vue-flow__node-output {
  padding: 10px;
  border: 1px solid var(--el-border-color);
  border-radius: 4px;
  color: var(--el-text-color);
  background-color: var(--el-fill-color);
  cursor: pointer;
}
</style>

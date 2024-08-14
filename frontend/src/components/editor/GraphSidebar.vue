<template>
  <el-aside class="aside">
    <div class="empty-padder"></div>
    <el-scrollbar class="scrollbar" always height="100vh">
      <div class="description">Drag a nodes to the graph</div>
      <div class="nodes">
        <h6>User Input Nodes</h6>
        <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="
            onDragStart($event, 'input', NODE_DATA_DEFAULT.inputShortString)
          "
        >
          Input Short Text
        </div>
        <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="
            onDragStart($event, 'inputNumber', NODE_DATA_DEFAULT.inputNumber)
          "
        >
          Input Number
        </div>
        <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="
            onDragStart(
              $event,
              'inputNumberMap',
              NODE_DATA_DEFAULT.inputNumberMap,
            )
          "
        >
          Input Number Map
        </div>

        <h6>Display Nodes</h6>
        <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="
            onDragStart(
              $event,
              'displayString',
              NODE_DATA_DEFAULT.displayShortText,
            )
          "
        >
          Display Short Text
        </div>
        <div
          class="vue-flow__node-output"
          draggable="true"
          @dragstart="
            onDragStart(
              $event,
              'displayNumber',
              NODE_DATA_DEFAULT.displayNumber,
            )
          "
        >
          Display Number
        </div>

        <h6>Functional Nodes</h6>
        <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="
            onDragStart($event, 'applyFormula', NODE_DATA_DEFAULT.applyFormula)
          "
        >
          Apply Formula
        </div>
      </div>
      <div class="empty-padder"></div>
      <div class="empty-padder"></div>
      <div class="empty-padder"></div>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import { ElAside, ElScrollbar } from "element-plus";
import { NODE_DATA_DEFAULT } from "../../util/constants";
import useDragAndDrop from "./useDnD";

export default {
  name: "GraphSidebar",
  computed: {
    NODE_DATA_DEFAULT() {
      return NODE_DATA_DEFAULT;
    },
  },
  components: {
    ElScrollbar,
    ElAside,
  },
  setup() {
    const { onDragStart } = useDragAndDrop();

    return {
      onDragStart,
    };
  },
};
</script>

<style scoped>
/* Add styles for the sidebar */
.description {
  padding: 10px;
}

.aside {
  overflow: hidden;
  width: 16rem;
}

.scrollbar {
  padding-left: 0.5rem;
  overflow: hidden;
}

.nodes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
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

.empty-padder {
  height: 10vh;
}
</style>

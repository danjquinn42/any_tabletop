<script setup>
import {ATNilData} from "./types/ATNilData";
import {ATNodeData} from "./types/ATNodeData";
import {ATNumberData} from "./types/ATNumberData";
import {ATStringData} from "./types/ATStringData";
import useDragAndDrop from './useDnD';

const {onDragStart} = useDragAndDrop();
</script>

<template>
  <aside>
    <div class="description">You can drag these nodes to the pane.</div>
    <div class="nodes">
      <h6>User Input Nodes</h6>
      <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="onDragStart($event, 'input',
          new ATNodeData(new ATNilData(), new ATStringData()))"
      >
        Input Short Text
      </div>
      <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="onDragStart($event, 'inputNumber',
          new ATNodeData(new ATNilData(), new ATNumberData()))"
      >
        Input Number
      </div>

      <h6>Display Nodes</h6>
      <div
          class="vue-flow__node-input"
          draggable="true"
          @dragstart="onDragStart($event, 'displayString',
          new ATNodeData(new ATStringData(), new ATNilData()))"
      >
        Display Short Text
      </div>
      <div
          class="vue-flow__node-output"
          draggable="true"
          @dragstart="onDragStart($event, 'displayNumber',
          new ATNodeData(new ATNumberData(), new ATNilData()))"
      >
        Display Number
      </div>

      <h6>Functional Nodes</h6>
      <div
          class="vue-flow__node-default"
          draggable="true"
          @dragstart="onDragStart($event, 'applyFormula',
          new ATNodeData(new ATNumberData(), new ATNumberData()))"
      >Apply Formula</div>
    </div>
  </aside>
</template>

<style scoped>
/* Add styles for the sidebar */
.description {
  padding: 10px;
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
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
}
</style>

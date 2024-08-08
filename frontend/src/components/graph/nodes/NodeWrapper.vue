<template>
  <div class="node-wrapper">
    <Handle
        v-if="inputCount !== 0"
        class="custom-handle input-handle target"
        :id="'input-handle' + id"
        :position="Position.Top"
        :connectable="true"
        type="target"
    ></Handle>
    <slot class="slot" :data="data" :updateOutputValue="updateOutputValue"></slot>
    <Handle
        v-if="outputCount !== 0"
        class="custom-handle output-handle source"
        :id="'output-handle' + id"
        :position="Position.Bottom"
        :connectable="true"
        type="source"
    ></Handle>
  </div>
</template>

<script>
import {Handle, Position, useVueFlow} from "@vue-flow/core";

export default {
  name: "NodeWrapper",
  components: { Handle },
  props: {
    inputCount: {
      type: Number,
      required: true,
    },
    outputCount: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const {updateNodeData, findNode} = useVueFlow();
    function updateOutputValue(outputValue) {
      const data = props.data.nodeData;
      data.setOutputValue(outputValue);
      updateNodeData(props.id, {nodeData: data});
      data.forEachChild(childId => {
        const targetData = findNode(childId).data.nodeData.withInputValue(outputValue);
        updateNodeData(childId, {nodeData: targetData});
      })
    }

    return {Position, updateOutputValue: updateOutputValue}
  }
}
</script>

<style scoped>

div:has( > .node-wrapper) {
  padding: 0;
}

.node-wrapper {
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  /* I'm a garbage person who writes garbage CSS.
  I cant find where the 10px padding is being set on the parent so negative margin it is. */
  margin: -10px;
  background-color: var(--el-bg-color-overlay);
}

.slot {
  text-align: center;
}

.custom-handle {
  /*position: absolute;*/
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: crosshair;
}
</style>
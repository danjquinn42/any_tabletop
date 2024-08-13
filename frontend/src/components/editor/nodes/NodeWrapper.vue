<template>
  <div class="node-wrapper">
    <div class="header">
      <el-collapse v-if="header">
        <el-collapse-item :title="header">
          {{ headerContent }}
        </el-collapse-item>
      </el-collapse>
    </div>
    <Handle
      v-if="inputCount !== 0"
      v-slot="{ isConnected }"
      :class="[
        { connected: isHandleConnected('input-handle' + id) },
        'custom-handle',
        'input-handle',
        'target',
      ]"
      :id="'input-handle' + id"
      :position="Position.Top"
      :connectable="!isHandleConnected('input-handle' + id)"
      :is-valid-connection="isValidConnection"
      type="target"
    ></Handle>
    <el-form-item v-if="!anonymous" label="label" size="small">
      <el-input v-model="data.nodeData.input.label"></el-input>
    </el-form-item>
    <h5 v-if="!anonymous">preview</h5>
    <slot
      class="slot"
      :data="data"
      :updateOutputValue="updateOutputValue"
    ></slot>
    <Handle
      v-if="outputCount !== 0"
      :class="[
        { connected: isHandleConnected('output-handle' + id) },
        'custom-handle',
        'input-handle',
        'target',
      ]"
      :id="'output-handle' + id"
      :position="Position.Bottom"
      :connectable="true"
      :is-valid-connection="isValidConnection"
      type="source"
    ></Handle>
  </div>
</template>

<script>
import { Handle, Position, useVueFlow } from "@vue-flow/core";
import {
  ElCard,
  ElText,
  ElCollapse,
  ElCollapseItem,
  ElFormItem,
  ElInput,
} from "element-plus";

export default {
  name: "NodeWrapper",
  components: {
    ElInput,
    ElFormItem,
    ElText,
    ElCard,
    Handle,
    ElCollapse,
    ElCollapseItem,
  },
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
    },
    header: {
      type: String,
    },
    headerContent: {
      type: String,
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { updateNodeData, findNode, getConnectedEdges } = useVueFlow();
    function updateChildrenDeep(nodeId, newInputValue) {
      const target =
        findNode(nodeId).data.nodeData.withInputValue(newInputValue);
      updateNodeData(nodeId, { nodeData: target });
      target.forEachChild((child) =>
        updateChildrenDeep(child, target.getOutputValue()),
      );
    }
    function updateOutputValue(outputValue) {
      const data = props.data.nodeData;
      data.setOutputValue(outputValue);
      updateNodeData(props.id, { nodeData: data });

      data.forEachChild((childId) => {
        updateChildrenDeep(childId, outputValue);
      });
    }

    function isHandleConnected(handleId) {
      try {
        const connectedEdges = getConnectedEdges(props.id);
        if (connectedEdges) {
          return connectedEdges.some(
            (edge) =>
              edge.targetHandle === handleId || edge.sourceHandle === handleId,
          );
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    }

    function isValidConnection({ source, sourceHandle, target, targetHandle }) {
      if (
        !(
          sourceHandle.includes("output-handle") &&
          targetHandle.includes("input-handle")
        )
      )
        return false;

      const sourceNode = findNode(source);
      const targetNode = findNode(target);

      return (
        sourceNode.data.nodeData.getOutput().type ===
        targetNode.data.nodeData.getInput().type
      );
    }

    return {
      Position,
      updateOutputValue,
      isValidConnection,
      isHandleConnected,
    };
  },
};
</script>

<style scoped>
div:has(> .node-wrapper) {
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
  text-align: left;
}

.header {
  margin-bottom: 1rem;
}

.card-body {
  padding-top: 0;
}

.custom-handle.custom-handle {
  /*position: absolute;*/
  width: 16px;
  height: 16px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: crosshair;
}

.custom-handle.valid {
  border: 3px solid var(--el-color-primary-light-3);
}

.custom-handle.connecting:not(.valid) {
  background-color: var(--el-color-error);
}

.custom-handle.connected {
  background-color: var(--el-color-primary-light-3);
  width: 12px;
  height: 12px;
}

.custom-handle:not(.connected):not(.valid):hover {
  border: 2px solid var(--el-color-primary-light-3);
}
</style>

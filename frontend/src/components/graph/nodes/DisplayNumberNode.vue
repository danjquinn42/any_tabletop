<template>
  <div class="display-number-node-wrapper">
    <!-- Top handle -->
    <Handle
        class="custom-handle target"
        :id="'displayNumber' + id"
        :position="Position.Top"
        :connectable="true"
        type="target"
    ></Handle>

    <!-- Display content -->
    <div class="display-number-node">
      {{ data.nodeData.getInputValue() }}
    </div>
  </div>
</template>

<script>
import {Handle, Position} from "@vue-flow/core";
import {ATNilData} from "../types/ATNilData";
import {ATNodeData} from "../types/ATNodeData";
import {ATNumberData} from "../types/NumberData";

export default {
  name: 'DisplayNumberNode',
  components: {Handle},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNilData(), new ATNumberData())
      },
    }
  },
  computed: {
    Position() {
      return Position
    },
  },
  setup(props) {
    props.data.nodeData.setOnUpdateInput(() => {
      props.data.nodeData.setOutput(props.data.nodeData.input)
    })
    return { Position };
  }
};
</script>

<style scoped>
.display-number-node-wrapper {
  position: relative;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}

.display-number-node {
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

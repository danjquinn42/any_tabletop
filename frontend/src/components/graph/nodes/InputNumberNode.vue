<template>
  <div class="input-number-node">
    <el-form>
      <el-form-item label="Character Level">
        <el-input-number
            v-model="data.nodeData.output.value"
            @change="updateNumber"
            :controls="false"
        />
      </el-form-item>
    </el-form>

    <Handle
        class="custom-handle source"
        :id="'inputNumber' + id"
        :position="Position.Bottom"
        :connectable="true"
        type="source"
    >n</Handle>
  </div>
</template>

<script>
import { useVueFlow, Handle, Position } from "@vue-flow/core";
import { ElForm, ElFormItem, ElInputNumber, ElInput } from "element-plus";
import {ATNilData} from "../types/ATNilData";
import {ATNodeData} from "../types/ATNodeData";
import {ATNumberData} from "../types/NumberData";

export default {
  name: 'InputNumberNode',
  computed: {
    Position() {
      return Position;
    }
  },
  components: { ElInput, ElForm, ElFormItem, ElInputNumber, Handle },
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
    },
  },
  setup(props) {
    const { updateNodeData, findNode } = useVueFlow();

    function updateNumber(newNumber) {
      const data = props.data.nodeData;
      data.setOutputValue(newNumber);
      updateNodeData(props.id, { nodeData: data});
      data.forEachChild(c => {
        const targetData = findNode(c).data.nodeData.withInputValue(newNumber);
        updateNodeData(c, { nodeData: targetData});
      });
    }

    return {
      updateNumber,
      updateNodeData,
    };
  },
};
</script>


<style scoped>
.input-number-node {
  padding: 10px;
  border: 2px solid var(--el-border-color);
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;
}

.custom-handle {
  width: 16px;
  height: 16px;
  color: black;
  font-size: small;
  text-align: center;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 50%;
  cursor: crosshair;
}

</style>

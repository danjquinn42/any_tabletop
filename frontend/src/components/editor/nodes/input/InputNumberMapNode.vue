<template>
  <NodeWrapper
    :id="id"
    :output-count="1"
    :input-count="0"
    :data="data"
    header="Input Key Value Pairs"
    v-slot="slotProps"
    :label-count="4"
  >
    <div>
      <el-form-item label="max rows">
        <el-input-number
          :controls="false"
          v-model="data.nodeData.options.maxRows"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-divider>preview</el-divider>
      <NumberMapInput
        :data="data"
        :update-output-value="slotProps.updateOutputValue"
        :row-count="rowCount"
      />
    </div>
  </NodeWrapper>
</template>

<script>
import {
  ElFormItem,
  ElDivider,
  ElInputNumber,
  ElInput,
  ElButton,
  ElButtonGroup,
} from "element-plus";
import NumberMapInput from "../../elements/NumberMapInput.vue";
import { ATKeyValuePairs } from "../../types/ATKeyValuePairs";
import { ATNodeData } from "../../types/ATNodeData";
import NodeWrapper from "../NodeWrapper.vue";

export default {
  name: "InputNumberMapNode",
  components: {
    ElDivider,
    ElButton,
    ElButtonGroup,
    ElInput,
    NumberMapInput,
    ElFormItem,
    ElInputNumber,
    NodeWrapper,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({
        nodeData: new ATNodeData(new ATKeyValuePairs(), new ATKeyValuePairs(), {
          maxRows: 10,
        }),
      }),
    },
  },
  setup(props) {
    if (!props.data.nodeData.options.maxRows) {
      props.data.nodeData.options.maxRows = 10;
    }
  },
  data() {
    return {
      rowCount: Object.keys(this.data.nodeData.getOutputValue()).length || 1,
    };
  },
};
</script>

<style scoped></style>

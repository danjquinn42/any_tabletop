<template>
  <NodeWrapper
      :id="id"
      :data="data"
      :output-count="1"
      :input-count="0"
      v-slot="slotProps"
  >
    <el-form>
      <el-form-item>
        <el-input-number
            v-model="data.nodeData.output.value"
            @change="slotProps.updateOutputValue"
            :controls="false"
        />
      </el-form-item>
    </el-form>
  </NodeWrapper>
</template>

<script>
import {ElForm, ElFormItem, ElInputNumber, ElInput} from "element-plus";
import {ATNilData} from "../types/ATNilData";
import {ATNodeData} from "../types/ATNodeData";
import {ATNumberData} from "../types/ATNumberData";
import NodeWrapper from "./NodeWrapper.vue";

export default {
  name: 'InputNumberNode',
  components: {NodeWrapper, ElInput, ElForm, ElFormItem, ElInputNumber},
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
};
</script>


<style scoped>
</style>

<template>
  <NodeWrapper
      :id="id"
      :output-count="1"
      :input-count="0"
      :data="data"
      v-slot="slotProps"
  >
    <div>
      <el-input
          v-model="data.nodeData.output.value"
          @input="slotProps.updateOutputValue"></el-input>
    </div>
  </NodeWrapper>
</template>

<script>
import {ElInput} from "element-plus";
import {ATNilData} from "../../types/ATNilData";
import {ATNodeData} from "../../types/ATNodeData";
import {ATStringData} from "../../types/ATStringData";
import NodeWrapper from "../NodeWrapper.vue";

export default {
  name: "InputNode",
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNilData(), new ATStringData())
      },
    },
  },
  components: {ElInput, NodeWrapper}
}
</script>

<style scoped>
</style>
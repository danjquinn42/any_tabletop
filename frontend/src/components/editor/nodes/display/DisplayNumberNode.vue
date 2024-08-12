<template>
  <NodeWrapper
      :id="id"
      :data="data"
      :output-count="0"
      :input-count="1"
      header="Display Number"
  >
    <DisplayData :data="data"/>
  </NodeWrapper>

</template>

<script>
import {ElFormItem, ElInput} from "element-plus";
import {ATNilData} from "../../types/ATNilData";
import {ATNodeData} from "../../types/ATNodeData";
import {ATNumberData} from "../../types/ATNumberData";
import NodeWrapper from "../NodeWrapper.vue";
import DisplayData from "../../elements/DisplayData.vue";

export default {
  name: 'DisplayNumberNode',
  components: {ElInput, ElFormItem, DisplayData, NodeWrapper},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNumberData(), new ATNilData())
      },
    }
  },
};
</script>


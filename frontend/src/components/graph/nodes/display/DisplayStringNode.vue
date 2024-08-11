<template>
  <NodeWrapper
      :id="id"
      :data="data"
      :output-count="0"
      :input-count="1"
      header="Display Short Text"
  >{{ data.nodeData.getInputValue() || "&nbsp;" }}
  </NodeWrapper>
</template>

<script>
import {ATNilData} from "../../types/ATNilData";
import {ATNodeData} from "../../types/ATNodeData";
import {ATStringData} from "../../types/ATStringData";
import NodeWrapper from "../NodeWrapper.vue";

export default {
  name: "DisplayStringNode",
  components: {NodeWrapper},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATStringData(), new ATNilData())
      },
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <NodeWrapper
      :id="id"
      :data="data"
      :output-count="0"
      :input-count="1"
  >
    <div class="displayNumber">
      {{ data.nodeData.getInputValue() }}
    </div>
  </NodeWrapper>

</template>

<script>
import {ATNilData} from "../../types/ATNilData";
import {ATNodeData} from "../../types/ATNodeData";
import {ATNumberData} from "../../types/ATNumberData";
import NodeWrapper from "../NodeWrapper.vue";

export default {
  name: 'DisplayNumberNode',
  components: {NodeWrapper},
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

<style scoped>

.displayNumber {
  text-align: center;
}

</style>

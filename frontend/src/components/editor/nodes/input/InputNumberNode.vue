<template>
  <NodeWrapper
    :id="id"
    :data="data"
    :output-count="1"
    :input-count="0"
    v-slot="slotProps"
    header="Input Number"
    header-content=""
  >
    <InputNumberComp
      :data="data"
      :updateOutputValue="slotProps.updateOutputValue"
    />
  </NodeWrapper>
</template>

<script>
import { NODE_DATA_DEFAULT } from "../../../../util/constants";
import NodeWrapper from "../NodeWrapper.vue";
import InputNumberComp from "../../elements/InputNumberComp.vue";

export default {
  name: "InputNumberNode",
  components: { InputNumberComp, NodeWrapper },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: NODE_DATA_DEFAULT.inputNumber;
      },
    },
  },
};
</script>

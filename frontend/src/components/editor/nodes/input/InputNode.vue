<template>
  <NodeWrapper
    :id="id"
    :output-count="1"
    :input-count="0"
    :data="data"
    header="Input Short Text"
    v-slot="slotProps"
  >
    <InputShortStringComp
      :data="data"
      :update-output-value="slotProps.updateOutputValue"
    />
  </NodeWrapper>
</template>

<script>
import { NODE_DATA_DEFAULT } from "../../../../util/constants";
import NodeWrapper from "../NodeWrapper.vue";
import InputShortStringComp from "../../elements/InputShortStringComp.vue";

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
        nodeData: NODE_DATA_DEFAULT.inputShortString;
      },
    },
  },
  components: { InputShortStringComp, NodeWrapper },
};
</script>

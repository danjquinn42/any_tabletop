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
import { ATNilData } from "../../types/ATNilData";
import { ATNodeData } from "../../types/ATNodeData";
import { ATStringData } from "../../types/ATStringData";
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
        nodeData: new ATNodeData(new ATNilData(), new ATStringData());
      },
    },
  },
  components: { InputShortStringComp, NodeWrapper },
};
</script>

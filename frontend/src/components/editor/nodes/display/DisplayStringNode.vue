<template>
  <NodeWrapper
    :id="id"
    :data="data"
    :output-count="0"
    :input-count="1"
    header="Display Short Text"
  >
    <DisplayData :data="data" />
  </NodeWrapper>
</template>

<script>
import { NODE_DATA_DEFAULT } from "../../../../util/constants";
import NodeWrapper from "../NodeWrapper.vue";
import DisplayData from "../../elements/DisplayData.vue";

export default {
  name: "DisplayStringNode",
  components: { DisplayData, NodeWrapper },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: NODE_DATA_DEFAULT.displayShortText;
      },
    },
  },
};
</script>

<template>
  <TemplateCompWrapper :id="id" :data="data">
    <DisplayData :data="data" />
  </TemplateCompWrapper>
</template>

<script>
import DisplayData from "../elements/DisplayData.vue";
import { ATNilData } from "../types/ATNilData";
import { ATNodeData } from "../types/ATNodeData";
import { ATNumberData } from "../types/ATNumberData";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "DisplayNumberTemplate",
  components: { DisplayData, TemplateCompWrapper },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNumberData(), new ATNilData());
      },
    },
  },
};
</script>

<style scoped></style>

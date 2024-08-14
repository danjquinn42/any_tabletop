<template>
  <TemplateCompWrapper :id="id" :data="data">
    <DisplayData :data="data" />
  </TemplateCompWrapper>
</template>

<script>
import { NODE_DATA_DEFAULT } from "../../../util/constants";
import DisplayData from "../elements/DisplayData.vue";
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
        nodeData: NODE_DATA_DEFAULT.displayNumber;
      },
    },
  },
};
</script>

<style scoped></style>

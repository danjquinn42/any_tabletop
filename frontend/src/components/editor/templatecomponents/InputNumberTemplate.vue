<template>
  <TemplateCompWrapper :id="id" :data="data" v-slot="slotProps">
    <InputNumberComp
      :data="data"
      :update-output-value="slotProps.updateOutputValue"
    />
  </TemplateCompWrapper>
</template>

<script>
import { NODE_DATA_DEFAULT } from "../../../util/constants";
import InputNumberComp from "../elements/InputNumberComp.vue";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "InputNumberTemplate",
  components: { InputNumberComp, TemplateCompWrapper },
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

<style scoped></style>

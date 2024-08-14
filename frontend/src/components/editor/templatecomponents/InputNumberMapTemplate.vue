<template>
  <TemplateCompWrapper id="id" :data="data" v-slot="slotProps">
    <NumberMapInput
      :data="data"
      :update-output-value="slotProps.updateOutputValue"
    />
  </TemplateCompWrapper>
</template>

<script>
import NumberMapInput from "../elements/NumberMapInput.vue";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "InputNumberMapTemplate",
  components: { NumberMapInput, TemplateCompWrapper },
  props: {
    data: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>

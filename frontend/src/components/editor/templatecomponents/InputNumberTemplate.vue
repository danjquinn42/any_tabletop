<template>
<TemplateCompWrapper
    :id="id"
    :data="data"
    v-slot="slotProps"
>
  <InputNumberComp :data="data" :update-output-value="slotProps.updateOutputValue" />
</TemplateCompWrapper>
</template>

<script>
import InputNumberComp from "../elements/InputNumberComp.vue";
import {ATNilData} from "../types/ATNilData";
import {ATNodeData} from "../types/ATNodeData";
import {ATNumberData} from "../types/ATNumberData";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "InputNumberTemplate",
  components: {InputNumberComp, TemplateCompWrapper},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => {
        nodeData: new ATNodeData(new ATNilData(), new ATNumberData())
      },
    },
  },
}
</script>

<style scoped>

</style>
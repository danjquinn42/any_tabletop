<template>
  <TemplateCompWrapper :id="id" :data="data" v-slot="slotProps">
    <InputShortStringComp :data="data" :update-output-value="slotProps.updateOutputValue"/>
  </TemplateCompWrapper>

</template>

<script>
import InputShortStringComp from "../elements/InputShortStringComp.vue";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "InputStringTemplate",
  components: {InputShortStringComp, TemplateCompWrapper},
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object
    },
  },
}
</script>

<style scoped>

</style>
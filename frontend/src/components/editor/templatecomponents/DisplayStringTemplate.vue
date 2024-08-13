<template>
  <TemplateCompWrapper :id="id" :data="data" v-slot="slotProps">
    <DisplayData :data="data" />
  </TemplateCompWrapper>
</template>

<script>
import DisplayData from "../elements/DisplayData.vue";
import InputShortStringComp from "../elements/InputShortStringComp.vue";
import TemplateCompWrapper from "./TemplateCompWrapper.vue";

export default {
  name: "InputStringTemplate",
  components: { DisplayData, InputShortStringComp, TemplateCompWrapper },
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
    },
  },
};
</script>

<style scoped></style>

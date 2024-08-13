<template>
  <el-form-item class="form-item" :label="data.nodeData.input.label">
    <el-input
      v-model="data.nodeData.output.value"
      @input="updateOutputValue"
    ></el-input>
  </el-form-item>
</template>
<script>
import { ElFormItem, ElInput } from "element-plus";

export default {
  name: "InputShortStringComp",
  components: { ElFormItem, ElInput },
  props: {
    data: {},
    updateOutputValue: { type: Function },
  },
};
</script>

<style scoped>
.form-item {
  margin-bottom: 0;
}
</style>

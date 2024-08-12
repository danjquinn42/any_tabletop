<template>
  <el-form-item class="form-item" :label="data.nodeData.input.label">
    <el-input-number
        v-model="data.nodeData.output.value"
        @input="(i) => updateOutputValue(i ||0)"
        :controls="false"
    />
  </el-form-item>
</template>
<script>
import {ElFormItem, ElInputNumber} from "element-plus";

export default {
  name: 'InputNumberComp',
  components: {ElInputNumber, ElFormItem},
  props: {
    data: {},
    updateOutputValue: { type: Function }
  }
}
</script>

<style scoped>
.form-item {
  margin-bottom: 0;
}
</style>

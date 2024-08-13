<template>
  <el-descriptions size="small" class="descriptions" border :column="1">
    <el-descriptions-item
      label-class-name="desc-label"
      label-align="right"
      :label="data.nodeData.input.label"
      class-name="value-col"
    >
      {{ data.nodeData.getInputValue() }}
    </el-descriptions-item>
  </el-descriptions>
</template>
<script>
import {
  ElDescriptions,
  ElDescriptionsItem,
  ElFormItem,
  ElInput,
} from "element-plus";

export default {
  name: "DisplayData",
  components: { ElInput, ElFormItem, ElDescriptions, ElDescriptionsItem },
  props: {
    data: { type: Object },
  },
};
</script>
<style>
.desc-label {
  min-width: 3rem;
  white-space: nowrap;
  flex-wrap: nowrap;
}

.value-col {
  width: 50%;
  min-width: 3rem;
}
</style>

<style scoped>
.descriptions {
  /*width: min-content;*/
  min-width: 3rem;
}
</style>

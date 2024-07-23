<template>
  <label class="switch">
    <input type="checkbox" id="label_toggle" />
    <el-text class="label">show labels</el-text>
  </label>
</template>

<script>
import { ElText } from "element-plus";

export default {
  name: "label-toggle",
  components: { ElText },
};
</script>

<style scoped>
.switch {
  position: absolute;
  padding: 8px 12px;
  background: #121212;
  color: #cfd3dc;
  border-radius: 8px;
  bottom: 20px;
  right: 20px;
}

.switch > input {
  margin-right: 8px;
}

.label {
  alignment-baseline: center;
}
</style>

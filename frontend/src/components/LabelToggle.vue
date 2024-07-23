<template>
  <label class="switch">
    <input type="checkbox" id="label_toggle" />
    <span class="slider round">Enable Labels</span>
  </label>
</template>

<script>
export default {
  name: "label-toggle",
};
</script>

<style scoped>
.switch {
  position: absolute;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  bottom: 20px;
  right: 20px;
}
</style>

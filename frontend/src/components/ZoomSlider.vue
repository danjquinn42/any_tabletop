<template>
  <div class="zoom_slider">
    <label class="sliderLabel">-</label>
    <label for="zoom_range">
      <input
        type="range"
        min="50"
        max="200"
        v-model="zoomValue"
        class="slider"
        id="zoom_range"
      />
    </label>
    <span class="sliderLabel">+</span>
  </div>
</template>

<script>
export default {
  name: "zoom-slider",
  data: function () {
    return {
      value: 100,
    };
  },
  methods: {},
  computed: {
    zoomValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
        this.$emit("zoomFactorUpdate", value);
      },
    },
  },
};
</script>

<style scoped>
.zoom_slider {
  position: absolute;
  padding: 8px 12px;
  background: #121212;
  border-radius: 8px;
  writing-mode: vertical-lr;
  direction: rtl;
  top: 88px;
  right: 28px;
}

.sliderLabel {
  writing-mode: horizontal-tb;
}
</style>

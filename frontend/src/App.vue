<template>
  <div class="wrapper">
    <zoom-slider @zoom-factor-update="zoomFactorUpdate" />
    <label-toggle v-if="(environment = 'development')" />
    <canvas id="pixi"></canvas>
  </div>
</template>

<script>
import { Application } from "pixi.js";
import "./index.css";
import { getAllHexes } from "./api/hex";
import LabelToggle from "./components/LabelToggle.vue";
import ZoomSlider from "./components/ZoomSlider.vue";
import HexGrid from "./map/HexGrid";
export default {
  name: "App",
  components: { LabelToggle, ZoomSlider },
  data: function () {
    return {
      environment: process.env.NODE_ENV,
    };
  },
  methods: {
    whenZoomUpdates(callback) {
      this.onZoomUpdate = callback;
    },
    zoomFactorUpdate(value) {
      this.onZoomUpdate(value);
    },
    async loadPixiApp() {
      const canvas = document.getElementById("pixi");
      const pixiApp = new Application();

      await pixiApp.init({
        background: "#EEEEEE",
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        view: canvas,
      });

      const hexConfig = await getAllHexes();
      const map = new HexGrid(pixiApp, hexConfig, this.whenZoomUpdates);
      map.draw();
    },
  },
  mounted() {
    this.loadPixiApp();
  },
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  pointer-events: none;
}

.wrapper > * {
  pointer-events: all;
}
</style>

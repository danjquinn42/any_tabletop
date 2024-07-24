<template>
  <canvas id="pixi" class="map"></canvas>
  <zoom-slider @zoom-factor-update="zoomFactorUpdate" />
</template>

<script>
import { Application } from "pixi.js";
import { getAllHexes } from "../../api/hex";
import HexGrid from "../../pixiclasses/HexGrid";
import ZoomSlider from "./ZoomSlider.vue";

export default {
  name: "map-canvas",
  components: { ZoomSlider },
  methods: {
    // provides a hook for the pixijs app to get updates from zoom slider
    whenZoomUpdates(callback) {
      this.onZoomUpdate = callback;
    },
    zoomFactorUpdate(value) {
      this.onZoomUpdate(value);
    },
    // Creates a pixi.js application. The elements in the canvas are not componentized
    // so all communication with the canvass must be done via callback.
    async loadPixiApp() {
      const canvas = document.getElementById("pixi");
      const pixiApp = new Application();

      await pixiApp.init({
        background: "#121212",
        resizeTo: window,
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
.map {
  z-index: 0;
  top: 0;
  left: 0;
  /* to override PixiJs updating canvas size when window resizes */
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}
</style>

<template>
  <el-container>
    <el-header>
      <top-navigation></top-navigation>
    </el-header>
    <el-main>
      <canvas id="pixi" class="map"></canvas>
      <zoom-slider @zoom-factor-update="zoomFactorUpdate" />
      <label-toggle v-if="environment === 'development'" />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import "element-plus/es/components/page-header/style/css";
import {
  ElPageHeader,
  ElButton,
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElText,
  ElSubMenu,
} from "element-plus";
import { Application } from "pixi.js";
import "./index.css";
import { getAllHexes } from "./api/hex";
import LabelToggle from "./components/LabelToggle.vue";
import TopNavigation from "./components/TopNavigation.vue";
import ZoomSlider from "./components/ZoomSlider.vue";
import HexGrid from "./map/HexGrid";

export default {
  name: "App",
  components: {
    ElText,
    TopNavigation,
    ElMain,
    ElSubMenu,
    ElMenuItem,
    ElMenu,
    ElHeader,
    ElFooter,
    ElContainer,
    ElButton,
    ElPageHeader,
    LabelToggle,
    ZoomSlider,
  },
  data: function () {
    return {
      environment: process.env.NODE_ENV,
    };
  },
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
        background: "#EEEEEE",
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

.wrapper > * {
  pointer-events: all;
}
</style>

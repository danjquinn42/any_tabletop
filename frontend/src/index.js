import { Application } from "pixi.js";
import HexGrid from "./map/HexGrid";
import "./index.css";
import { getAllHexes } from "./api/hex";
import { createApp } from "vue";
import App from "./App.vue";

// Asynchronous IIFE
(async () => {
  // Create a PixiJS application.
  const app = new Application();

  // Intialize the application.
  await app.init({
    background: "#EEEEEE",
    resizeTo: window,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
  });

  // Then adding the application's canvas to the DOM body.
  // document.body.appendChild(app.canvas);
  document.body.prepend(app.canvas);
  const hexConfig = await getAllHexes();

  const map = new HexGrid(40, app, hexConfig);
  map.draw();
  createApp(App).mount("#app");
})();

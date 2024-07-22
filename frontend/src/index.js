import { Application } from "pixi.js";
import HexGrid from "./map/HexGrid";

import "./index.css";
import "./map/zoom-slider/zoom-slider.css";

import { getAllHexes } from "./api/hex";

import ZoomSlider from "./map/zoom-slider/zoom-slider";
import { loadComponent } from "./component/Component";
import LabelToggle from "./map/label-toggle/label-toggle";
import { forEach } from "lodash";

const rootLevelComponents = {
  zoomSlider: new ZoomSlider(),
  labelToggle: new LabelToggle(),
};

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

  const map = new HexGrid(
    app,
    hexConfig,
    rootLevelComponents.zoomSlider,
    rootLevelComponents.labelToggle,
  );
  map.draw();
})();

document.addEventListener("DOMContentLoaded", async () => {
  forEach(rootLevelComponents, (c) => loadComponent(c));
});

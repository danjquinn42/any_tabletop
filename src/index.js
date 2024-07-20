import { Application } from "pixi.js";
import HexGrid from "./map/HexGrid";

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
  document.body.appendChild(app.canvas);

  const map = new HexGrid(50, 50, 30, app);
  map.draw();
})();

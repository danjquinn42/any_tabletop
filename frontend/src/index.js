import { Application } from "pixi.js";
import HexGrid from "./map/HexGrid";
import "./index.css";

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

  const map = new HexGrid(40, app);
  map.draw();
})();

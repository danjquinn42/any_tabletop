import { Application } from "pixi.js";
import * as styles from "./index.css";
import Hex from "./map/Hex";

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
  // document.body.appendChild(styles);

  const stylesheet = document.createElement("link");
  stylesheet.type = "text/css";
  stylesheet.rel = "stylesheet";
  stylesheet.href = styles;

  document.head.appendChild(stylesheet);

  // Then adding the application's canvas to the DOM body.
  document.body.appendChild(app.canvas);

  const hex = new Hex(200, 200, 50, app);
  await hex.render();
})();

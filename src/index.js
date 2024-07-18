import { Application } from 'pixi.js';
import * as styles from './index.css';

// Asynchronous IIFE
(async () =>
{
    // Create a PixiJS application.
    const app = new Application();

    // Intialize the application.
    await app.init({ background: '#EEEEEE', resizeTo: window });
    // document.body.appendChild(styles);

    const stylesheet = document.createElement("link");
    stylesheet.type = "text/css";
    stylesheet.rel = "stylesheet";
    stylesheet.href = styles;

    document.head.appendChild(stylesheet);

    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
})();

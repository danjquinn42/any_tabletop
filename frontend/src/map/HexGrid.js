import { HEX_ANGLE } from "../util/constants";
import Hex from "./Hex";
import { Graphics } from "pixi.js";

class HexGrid {
  radius;
  startingX;
  startingY;

  static ROW_COUNT = 31;
  static COLUMN_COUNT = 27;

  isDragging = false;
  app;

  frame;

  dragData;

  constructor(radius, app) {
    this.startingX = 0;
    this.startingY = (-radius * HexGrid.COLUMN_COUNT) / 2;
    this.radius = radius;
    this.app = app;
  }

  draw() {
    this.createFrame();

    let y = this.startingY + this.radius * Math.sin(HEX_ANGLE);
    for (let i = 0; i < HexGrid.ROW_COUNT; ++i) {
      this.drawRow(y, i);
      y += 2 * this.radius * Math.sin(HEX_ANGLE);
    }
  }

  drawRow(y, rowNumber) {
    let x = this.startingX;
    for (let i = 0; i < HexGrid.COLUMN_COUNT; ++i) {
      y =
        i % 2 === 0
          ? y - this.radius * Math.sin(HEX_ANGLE)
          : y + this.radius * Math.sin(HEX_ANGLE);
      x += this.radius * (1 + Math.cos(HEX_ANGLE));
      const id = `${rowNumber}_${i}`;
      const hex = new Hex(x, y, this.radius, this.frame, id);
      hex.initialize();
    }
  }

  createFrame() {
    this.frame = new Graphics();
    const h = 1.5 * this.radius;
    const d = Math.sqrt(3) * this.radius;
    let frameWidth = h * HexGrid.COLUMN_COUNT + h;
    let frameHeight = d * HexGrid.ROW_COUNT + d;
    this.frame.rect(
      this.startingX,
      this.startingY - h,
      frameWidth,
      frameHeight,
    );
    this.frame.fill("#123456");
    this.app.stage.addChild(this.frame);

    this.addEventHandlers(frameWidth, frameHeight);
  }

  addEventHandlers(frameWidth, frameHeight) {
    this.frame.eventMode = "static";
    this.frame.cursor = "pointer";
    this.app.stage.hitArea = this.app.screen;
    this.frame.on("pointerup", () => (this.isDragging = false));
    this.frame.on("mouseleave", () => (this.isDragging = false));
    this.frame.on("pointerdown", (e) => this.onDragStart(e));
    this.frame.on("pointermove", () => this.onDragMove());

    const zoomSlider = document.getElementById("zoom_range");
    const zoom = () => {
      const zoomFactor = zoomSlider.value / 40;
      this.frame.width = frameWidth * zoomFactor;
      this.frame.height = frameHeight * zoomFactor;
    };
    zoom();

    zoomSlider.addEventListener("change", zoom);
  }

  onDragStart(event) {
    this.isDragging = true;
    this.dragData = event.data;

    const position = this.dragData.getLocalPosition(this.frame);
    this.frame.pivot.set(position.x, position.y);
    this.frame.position.set(this.dragData.global.x, this.dragData.global.y);
  }
  onDragMove() {
    if (!this.isDragging) return;
    const newPosition = this.dragData.page;

    this.frame.x = newPosition.x;
    this.frame.y = newPosition.y;
  }
}

export default HexGrid;
import { HEX_ANGLE } from "../util/constants";
import Hex from "./Hex";

class HexGrid {
  radius;
  startingX;
  startingY;

  static ROW_COUNT = 31;
  static COLUMN_COUNT = 27;
  app;
  constructor(startingX, startingY, radius, app) {
    this.startingX = startingX;
    this.startingY = startingY;
    this.radius = radius;
    this.app = app;
  }

  draw() {
    let y = this.startingY + this.radius * Math.sin(HEX_ANGLE);
    for (let i = 0; i < HexGrid.ROW_COUNT; ++i) {
      this.drawRow(y);
      y += 2 * this.radius * Math.sin(HEX_ANGLE);
    }
  }

  drawRow(y) {
    let x = this.startingX;
    for (let i = 0; i < HexGrid.COLUMN_COUNT; ++i) {
      const hex = new Hex(x, y, this.radius, this.app); //`${rowNumber}_${i}`
      hex.initialize();
      y =
        i % 2 === 0
          ? y - this.radius * Math.sin(HEX_ANGLE)
          : y + this.radius * Math.sin(HEX_ANGLE);
      x += this.radius * (1 + Math.cos(HEX_ANGLE));
    }
  }
}

export default HexGrid;

import { Assets, Graphics, Sprite } from "pixi.js";
import { HEX_ANGLE } from "../util/constants";
import mountain from "../assets/mountain_range.svg";

class Hex {
  x;
  y;
  radius;
  coordinateSet = [];
  color;
  app;

  constructor(x, y, radius, app) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.app = app;
    this.color = "#7a838a";

    this.updateCoordinates();
  }

  updateCoordinates() {
    for (let i = 0; i < 6; ++i) {
      let vertexX = this.x + this.radius * Math.cos(HEX_ANGLE * ((i + 4) % 6));
      let vertexY = this.y + this.radius * Math.sin(HEX_ANGLE * ((i + 4) % 6));
      this.coordinateSet.push({ x: vertexX, y: vertexY });
    }
  }

  async render() {
    const background = this.drawHexagon();
    background.fill(this.color);
    this.app.stage.addChild(background);

    const mask = this.drawHexagon();
    mask.fill(this.color);

    this.addIcon(mask);

    const outline = this.drawHexagon();
    outline.stroke({ width: 2, color: "#000000" });
    this.app.stage.addChild(mask);
    this.app.stage.addChild(outline);
  }

  addIcon(mask) {
    Assets.load(mountain).then((texture) => {
      const imageSprite = new Sprite(texture);

      const hexBounds = mask.getBounds();
      imageSprite.width = hexBounds.width;
      imageSprite.height = hexBounds.height;

      imageSprite.x = hexBounds.x;
      imageSprite.y = hexBounds.y;

      imageSprite.mask = mask;

      this.app.stage.addChild(imageSprite);
    });
  }

  drawHexagon() {
    const graphic = new Graphics();
    graphic.moveTo(this.x - this.radius, this.y);
    this.coordinateSet.forEach((vertex) => {
      graphic.lineTo(vertex.x, vertex.y);
    });

    return graphic;
  }
}

export default Hex;

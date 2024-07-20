import { Assets, Graphics, Sprite } from "pixi.js";
import { HEX_ANGLE } from "../util/constants";
import mountain from "../assets/mountain_range.svg";

class Hex {
  x;
  y;
  radius;
  coordinateSet = [];
  defaultColor;
  hoverColor;
  clickColor;
  background;
  frame;

  constructor(x, y, radius, frame) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.frame = frame;
    this.defaultColor = "#7a838a";
    this.hoverColor = "#9baab2";
    this.clickColor = "#87a3ad";
  }

  initialize() {
    this.updateCoordinates();
    this.render();

    this.background.eventMode = "static";
    this.background.cursor = "pointer";
    this.background.on("pointerover", () => this.changeColor(this.hoverColor));
    this.background.on("pointerleave", () =>
      this.changeColor(this.defaultColor),
    );
    this.background.on("pointerout", () => this.changeColor(this.defaultColor));
    this.background.on("pointerup", () => this.changeColor(this.hoverColor));
    this.background.on("pointerdown", () => this.changeColor(this.clickColor));
  }

  updateCoordinates() {
    for (let i = 0; i < 6; ++i) {
      let vertexX = this.x + this.radius * Math.cos(HEX_ANGLE * ((i + 4) % 6));
      let vertexY = this.y + this.radius * Math.sin(HEX_ANGLE * ((i + 4) % 6));
      this.coordinateSet.push({ x: vertexX, y: vertexY });
    }
  }

  changeColor(color) {
    this.background.clear();
    this.drawHexagon(this.background);
    this.background.fill(color);
  }

  render() {
    const background = new Graphics();
    this.drawHexagon(background);
    background.fill(this.defaultColor);

    const mask = new Graphics();
    this.drawHexagon(mask);
    mask.fill();

    this.addIcon(mask);

    const outline = new Graphics();
    this.drawHexagon(outline);
    outline.stroke({ width: 2, color: "#123456" });
    this.background = background;

    this.frame.addChild(background);
    background.addChild(outline);
    background.addChild(mask);
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

      this.background.addChild(imageSprite);
    });
  }

  drawHexagon(graphic) {
    graphic.moveTo(this.x - this.radius, this.y);
    this.coordinateSet.forEach((vertex) => {
      graphic.lineTo(vertex.x, vertex.y);
    });

    return graphic;
  }
}
export default Hex;

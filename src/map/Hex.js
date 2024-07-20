import { Assets, Graphics, Sprite, ColorMatrixFilter } from "pixi.js";
import { HEX_ANGLE } from "../util/constants";
import mountain from "../assets/mountain_range.svg";

class Hex {
  x;
  y;
  radius;
  coordinateSet = [];
  defaultColor;
  background;
  frame;

  constructor(x, y, radius, frame) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.frame = frame;
    this.defaultColor = "#7a838a";
  }

  initialize() {
    this.updateCoordinates();
    this.render();

    const filter = new ColorMatrixFilter();
    this.background.filters = [filter];

    this.background.eventMode = "static";
    this.background.cursor = "pointer";
    this.background.on("pointerleave", () => this.onLoseFocus(filter));
    this.background.on("pointerout", () => this.onLoseFocus(filter));
    this.background.on("pointerover", () => this.onHover(filter));
    this.background.on("pointerup", () => this.onHover(filter));
    this.background.on("pointerdown", () => this.onMouseDown(filter));
  }

  updateCoordinates() {
    for (let i = 0; i < 6; ++i) {
      let vertexX = this.x + this.radius * Math.cos(HEX_ANGLE * ((i + 4) % 6));
      let vertexY = this.y + this.radius * Math.sin(HEX_ANGLE * ((i + 4) % 6));
      this.coordinateSet.push({ x: vertexX, y: vertexY });
    }
  }

  onHover(filter) {
    filter.contrast(0.6);
  }

  onMouseDown(filter) {
    filter.contrast(0.9);
  }

  onLoseFocus(filter) {
    filter.contrast(0);
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

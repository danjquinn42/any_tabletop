import { Assets, Graphics, Sprite } from "pixi.js";
import { HEX_ANGLE } from "../util/constants";
import mountain from "../assets/mountain_range.svg";

class Hex {
  x;
  y;
  radius;
  coordinateSet = [];
  color;
  defaultColor;
  app;

  _background;
  _mask;
  _outline;

  constructor(x, y, radius, app) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.app = app;
    this.defaultColor = "#7a838a";
    this.color = this.defaultColor;
    this.hovercolor = "#9baab2";

    this.updateCoordinates();
  }

  initialize() {
    this.render();
    this._background.eventMode = "static";
    this._background.cursor = "pointer";
    this._background.on("pointerover", () => {
      this.isMouseOver(true);
    });
    this._background.on("pointerout", () => {
      this.isMouseOver(false);
    });
  }

  updateCoordinates() {
    for (let i = 0; i < 6; ++i) {
      let vertexX = this.x + this.radius * Math.cos(HEX_ANGLE * ((i + 4) % 6));
      let vertexY = this.y + this.radius * Math.sin(HEX_ANGLE * ((i + 4) % 6));
      this.coordinateSet.push({ x: vertexX, y: vertexY });
    }
  }

  isMouseOver(hover) {
    this.color = hover ? this.hovercolor : this.defaultColor;
    this.render();
  }

  render() {
    this.addBackground();

    this._mask = this.drawHexagon();
    this._mask.fill();
    this.app.stage.addChild(this._mask);

    this.addIcon(this._mask);

    this._outline = this.drawHexagon();
    this._outline.stroke({ width: 2, color: "#000000" });
    this.app.stage.addChild(this._outline);
  }

  addBackground(hover) {
    const background = this.drawHexagon();
    background.fill(hover ? this.hovercolor : this.color);
    this.app.stage.addChild(background);
    this._background = background;
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

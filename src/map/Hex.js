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
  app;
  isDragging;
  _background;
  _mask;
  _outline;
  _imageSprite;

  _dragStartX;
  _dragStartY;

  constructor(x, y, radius, app) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.app = app;
    this.defaultColor = "#7a838a";
    this.hoverColor = "#9baab2";
    this.clickColor = "#87a3ad";
    this.isDragging = false;

    this.updateCoordinates();
  }

  initialize() {
    this.render();

    this._background.eventMode = "static";
    this._background.cursor = "pointer";
    this.app.stage.hitArea = this.app.screen;
    this._background.on("pointerover", () => {
      this.changeColor(this.hoverColor);
      this.isDragging = false;
    });
    this._background.on("pointerout", () => {
      this.changeColor(this.defaultColor);
    });

    this._background.on("pointerup", () => {
      this.changeColor(this.hoverColor);
      this.isDragging = false;
    });
    this._background.on("pointerdown", (e) => this.onDragStart(e));
    this._background.on("pointermove", (e) => {
      this.onDragMove(e);
    });
  }

  onDragStart(event) {
    this.changeColor(this.clickColor);
    this.data = event.data;
    this.isDragging = true;
    const position = event.data.getLocalPosition(this._background);
    this._background.pivot.set(position.x, position.y);
    this._background.position.set(this.data.global.x, this.data.global.y);
    this._mask.pivot.set(position.x, position.y);
    this._mask.position.set(this.data.global.x, this.data.global.y);
    this._outline.pivot.set(position.x, position.y);
    this._outline.position.set(this.data.global.x, this.data.global.y);

    this._imageSprite.anchor.set(0, 0);
    this.dragStartPosition = event.data.getLocalPosition(this.app.stage);
  }

  onDragMove(event) {
    if (!this.isDragging) return;
    const newPosition = this.data;

    this._background.x = newPosition.page.x;
    this._background.y = newPosition.page.y;

    this._mask.x = newPosition.page.x;
    this._mask.y = newPosition.page.y;
    this._outline.x = newPosition.page.x;
    this._outline.y = newPosition.page.y;

    const spritePosition = event.data.getLocalPosition(this.app.stage);
    const dx = spritePosition.x - this.dragStartPosition.x;
    const dy = spritePosition.y - this.dragStartPosition.y;

    this._imageSprite.x += dx;
    this._imageSprite.y += dy;
    //
    this.dragStartPosition = spritePosition;
  }

  updateCoordinates() {
    for (let i = 0; i < 6; ++i) {
      let vertexX = this.x + this.radius * Math.cos(HEX_ANGLE * ((i + 4) % 6));
      let vertexY = this.y + this.radius * Math.sin(HEX_ANGLE * ((i + 4) % 6));
      this.coordinateSet.push({ x: vertexX, y: vertexY });
    }
  }

  changeColor(color) {
    this._background.clear();
    this.drawHexagon(this._background);
    this._background.fill(color);
  }

  render() {
    const background = new Graphics();
    this.drawHexagon(background);
    background.fill(this.defaultColor);
    this.app.stage.addChild(background);

    const mask = new Graphics();
    this.drawHexagon(mask);
    mask.fill();

    this.app.stage.addChild(mask);

    this.addIcon(mask);

    const outline = new Graphics();
    this.drawHexagon(outline);
    outline.stroke({ width: 2, color: "#000000" });
    this.app.stage.addChild(outline);

    [this._background, this._mask, this._outline] = [background, mask, outline];
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

      this._imageSprite = imageSprite;

      this.app.stage.addChild(imageSprite);
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

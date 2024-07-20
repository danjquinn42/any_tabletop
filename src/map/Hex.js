import {
  Assets,
  Graphics,
  Sprite,
  ColorMatrixFilter,
  Text,
  TextStyle,
} from "pixi.js";
import { HEX_ANGLE } from "../util/constants";
import HEX_CONFIG, { DEFAULT_STYLES } from "../util/localMapConfig";
import { isNull, merge, mergeWith } from "lodash";

class Hex {
  x;
  y;
  radius;
  coordinateSet = [];
  defaultColor;
  background;
  frame;
  id;
  styles;

  constructor(x, y, radius, frame, id) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.frame = frame;
    this.id = id;

    const config = HEX_CONFIG[id];
    const styleOverrides = config.styleOverrides;
    const defaultStyle = merge({}, DEFAULT_STYLES[config.terrain]);
    this.styles = mergeWith(defaultStyle, styleOverrides, (d, s) => {
      if (isNull(s)) {
        return d;
      }
    });
  }

  initialize() {
    const config = HEX_CONFIG[this.id];
    if (!config) {
      throw new Error("undefined color id " + this.id);
    }

    if (!!config.color) {
      this.defaultColor = config.color;
    } else {
      this.defaultColor = DEFAULT_STYLES[config.terrain].color;
    }

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
    this.background = background;

    const mask = new Graphics();
    this.drawHexagon(mask);
    mask.fill();

    this.addIcon(mask);

    const outline = new Graphics();
    this.drawHexagon(outline);
    outline.stroke({ width: 2, color: "#123456" });

    this.frame.addChild(background);
    background.addChild(outline);
  }

  addIcon(mask) {
    const svg = this.styles.icon;
    if (isNull(svg)) {
      const label = this.createLabel();
      this.background.addChild(label);
    } else {
      Assets.load(svg).then((texture) => {
        const imageSprite = new Sprite(texture);

        const hexBounds = mask.getBounds();
        imageSprite.width = hexBounds.width;
        imageSprite.height = hexBounds.height;

        imageSprite.x = hexBounds.x;
        imageSprite.y = hexBounds.y;

        imageSprite.mask = mask;

        this.background.addChild(imageSprite);
        this.background.addChild(mask);

        const label = this.createLabel();
        this.background.addChild(label);
      });
    }
  }
  createLabel() {
    const label = new Graphics();
    label.roundRect(
      this.x - this.radius * 0.5,
      this.y + this.radius * 0.5,
      this.radius,
      this.radius * 0.4,
      4,
    );
    label.fill("#000000");

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: `${label.height - 3}em`,
      fill: "#EEEEEE",
      align: "center",
    });
    const labelText = new Text({
      text: this.id,
      style,
    });

    labelText.x = this.coordinateSet[0].x + this.radius / 2;
    labelText.y = this.coordinateSet[0].y + this.radius * 1.5;
    labelText.anchor.set(0.5, 0.5);

    label.addChild(labelText);
    return label;
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

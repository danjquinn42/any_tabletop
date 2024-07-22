import zoomSliderHtml from "./zoom-slider.html";
import "./zoom-slider.css";
import Component from "../../component/Component";

class ZoomSlider extends Component {
  constructor(props) {
    super("zoom-slider", zoomSliderHtml, props);
  }
  bindTo(graphic) {
    const w = graphic.width;
    const h = graphic.height;
    this.onChange(() => this.zoom(graphic, w, h));
    this.zoom(graphic, w, h);
  }
  getValue() {
    return this.getHTMLElement().getElementsByTagName("input")[0].value;
  }

  zoom(graphic, initialWidth, initialHeight) {
    console.log("called zoom");
    const zoomFactor = this.getValue() / 40;
    graphic.width = initialWidth * zoomFactor;
    graphic.height = initialHeight * zoomFactor;
  }
}

export default ZoomSlider;

import labelToggleHtml from "./label-toggle.html";
import "./label-toggle.css";
import Component from "../../component/Component";

class LabelToggle extends Component {
  constructor() {
    super("label-toggle", labelToggleHtml);
  }
  bindTo(graphic) {
    this.onChange(() => this.updateVisibility(graphic));
    this.updateVisibility(graphic);
  }

  isChecked() {
    return this.getHTMLElement().getElementsByTagName("input")[0].checked;
  }

  updateVisibility = (graphic) => {
    graphic.visible = this.isChecked();
  };
}

export default LabelToggle;

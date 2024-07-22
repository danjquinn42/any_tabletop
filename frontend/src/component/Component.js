import { isNil } from "lodash";

let c = 1000;
const counter = () => c++;
export default class Component {
  children = [];
  id;

  constructor(tag, html) {
    this._htmlElement = document.createElement(tag);
    this._htmlElement.id = tag + counter().toString();
    this._htmlElement.innerHTML = html;
    this.id = this._htmlElement.id;
  }
  addChild(child) {
    this.children.push(child);
  }

  onChange(callback) {
    this.getHTMLElement().addEventListener("change", callback);
  }

  getUnloadedElement() {
    return this._htmlElement;
  }

  getHTMLElement() {
    let element = document.getElementById(this.id);
    if (isNil(element)) {
      throw new Error(`element ${this.id} not found. 
            Make sure the element is loaded to the dom before calling functions on it`);
    }
    return element;
  }
}

export function loadComponent(rootComponent, destination = "body") {
  const component = rootComponent.getUnloadedElement();
  const parent = document.getElementById(destination);
  parent.appendChild(component);
  rootComponent.children.forEach((c) => loadComponent(c, rootComponent.id));
}

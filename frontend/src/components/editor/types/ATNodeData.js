import { remove } from "lodash";
import { ATDataType } from "./ATDataType";

export class ATNodeData {
  input;

  output;

  options;

  children = [];

  afterUpdateInput = () => {
    this.setOutputValue(this.getInputValue());
  };

  constructor(input, output, options = {}) {
    this.input = input;
    this.output = output;
    this.options = options;
  }

  static fromNodeData(nodeData) {
    const input = nodeData.input;
    const output = nodeData.output;
    const options = nodeData.options;
    const atInput = new ATDataType(input.type);
    atInput.setValue(input.value);
    atInput.setLabel(input.label);
    const atOutput = new ATDataType(output.type);
    atOutput.setValue(output.value);
    atOutput.setLabel(output.label);
    const atNode = new ATNodeData(atInput, atOutput, options);
    atNode.children = nodeData.children;
    return atNode;
  }

  setAfterUpdateInput(callback) {
    this.afterUpdateInput = callback;
  }

  addChild(childId) {
    this.children.push(childId);
  }

  withoutChild(childId) {
    remove(this.children, (child) => childId === child);
    return this;
  }

  getOutput() {
    return this.output;
  }

  getInput() {
    return this.input;
  }

  setOutputValue(value) {
    this.output.setValue(value);
  }

  setInputValue(value) {
    this.input.setValue(value);
    this.afterUpdateInput(this.input);
  }

  getInputValue() {
    return this.input.value;
  }

  getOutputValue() {
    return this.output.value;
  }

  forEachChild(callback) {
    this.children.forEach((child) => callback(child));
  }
}

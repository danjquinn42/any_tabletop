import { remove } from "lodash";
import { ATDataType } from "./ATDataType";

export class ATNodeData {
  input = { type: "undefined ", label: "", value: undefined };

  output = { type: "undefined ", label: "", value: undefined };

  children = [];

  afterUpdateInput = () => {};

  constructor(input, output) {
    this.input = input;
    this.output = output;
  }

  static fromNodeData(nodeData) {
    const input = nodeData.input;
    const output = nodeData.output;
    const atInput = new ATDataType(input.type);
    atInput.setValue(input.value);
    atInput.setLabel(input.label);
    const atOutput = new ATDataType(output.type);
    atOutput.setValue(output.value);
    atOutput.setLabel(output.label);
    const atNode = new ATNodeData(atInput, atOutput);
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

  setInput(input) {
    if (this.input.type === input.type) {
      this.input = input;
      this.afterUpdateInput(input);
    } else {
      throw new Error(
        `Input type ${input.type} cannot be assigned to input ${this.input.type}`,
      );
    }
  }

  setOutput(output) {
    if (this.output.type === output.type) {
      this.output = output;
    } else {
      throw new Error(
        `Output type ${output.type} cannot be assigned to output ${this.output.type}`,
      );
    }
  }

  getOutput() {
    return this.output;
  }

  getInput() {
    return this.input;
  }

  setOutputValue(value) {
    if (typeof value === typeof this.output.value) {
      this.output.setValue(value);
    } else {
      throw new Error(
        `Output value ${typeof value} cannot be value of ${typeof this.output.value}`,
      );
    }
  }

  withInputValue(value) {
    if (typeof value === typeof this.input.value) {
      this.input.setValue(value);
      this.afterUpdateInput(this.input);
      return this;
    }
    throw new Error(
      `input value ${typeof value} cannot be value of ${typeof this.input.value}`,
    );
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

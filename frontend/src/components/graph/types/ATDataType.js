export class ATDataType {
  type = "";
  label = "";
  value = undefined;

  constructor(type) {
    this.type = type;
  }

  setValue(value) {
    this.value = value;
  }

  setLabel(label) {
    this.label = label;
  }
}

export class InputType {
  type;
  prefix;
  postfix;
  constructor(type) {
    this.type = type;
  }

  withPrefix(string) {
    this.prefix = string;
    return this;
  }
  withPostfix(string) {
    this.postfix = string;
    return this;
  }
}
export class InputTypeText extends InputType {
  limit;
  constructor(lengthLimit = 50) {
    super("input");
    this.limit = lengthLimit;
  }

  withLimit(number) {
    this.limit = number;
    return this;
  }
}

export class InputTypeTextArea extends InputType {
  limit;

  constructor(lengthLimit = 2000) {
    super("textArea");
    this.limit = lengthLimit;
  }

  withLengthLimit(number) {
    this.limit = number;
    return this;
  }
}

export class InputTypeSelect extends InputType {
  options;
  allowOther;
  multiSelect;
  constructor(options) {
    super("select");
    this.options = options;
    this.allowOther = false;
    this.multiSelect = false;
  }

  withAllowOther(bool = true) {
    this.allowOther = bool;
    return this;
  }

  withMultiSelect(bool = true) {
    this.multiSelect = bool;
    return this;
  }
}

export class InputTypeNumber extends InputType {
  min;
  max;
  step = 1;
  constructor(min = 0, max = 9000000000000000) {
    super("number");
    this.min = min;
    this.max = max;
  }

  withMin(number) {
    this.min = number;
    return this;
  }
  withMax(number) {
    this.max = number;
    return this;
  }

  withStep(number) {
    this.step = number;
    return this;
  }
}

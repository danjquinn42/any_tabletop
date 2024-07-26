export class InputType {
  type;
  prefix;
  postfix;
  inheritedBy = []; // TODO implement template inheritance
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

export class InputTypeButton extends InputType {
  constructor() {
    super("addMoreButton");
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

export class FormItem {
  label;
  type;
  input;
  constructor(label, type, input) {
    this.label = label;
    this.type = type;
    this.input = input;
  }

  withLabel(label) {
    this.label = label;
    return this;
  }

  withType(type) {
    this.type = type;
    return this;
  }

  withInput(input) {
    this.input = input;
    return this;
  }
}

export class NotAnInput extends InputType {
  constructor() {
    super("notAnInput");
  }
}

export class InputTypeSection extends InputType {
  header = new FormItem("Title", "string", new InputTypeText());
  body = new FormItem("", "string", new InputTypeTextArea());
  deletable;

  constructor(canDelete = true) {
    super("section");
    this.deletable = canDelete;
  }
  withDeletable(bool) {
    this.deletable = bool;
  }
}
export class Article {
  title;
  sections;

  addSectionButton;
  imageInput;

  constructor(
    title = new FormItem("Title", "string", new InputTypeText()),
    firstSection = new InputTypeSection(false),
    addSectionButton = new FormItem(
      "Add another section",
      "form-state",
      new InputTypeButton(),
    ),
  ) {
    this.title = title;
    this.sections = [firstSection];
    this.addSectionButton = addSectionButton;
  }

  addSection(section) {
    this.sections.push(section.withDeletable(true));
  }
  withAddSection(button) {
    this.addSectionButton = button;
    return this;
  }

  withInput(imageInput) {
    this.imageInput = imageInput;
    return this;
  }
}

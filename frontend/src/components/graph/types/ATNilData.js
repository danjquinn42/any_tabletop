import { ATDataType } from "./ATDataType";

export class ATNilData extends ATDataType {
  value = undefined;
  label = "undefined";

  constructor() {
    super("undefined");
  }

  setValue() {
    throw new Error("cannot set value on NilData");
  }

  seLabel() {
    throw new Error("cannot set value on NilData");
  }
}

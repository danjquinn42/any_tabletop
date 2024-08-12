import { ATDataType } from "./ATDataType";

export class ATNilData extends ATDataType {
  value = null;
  label = "nil";

  constructor() {
    super("nil");
  }

  setValue() {
    throw new Error("cannot set value on NilData");
  }

  seLabel() {
    throw new Error("cannot set value on NilData");
  }
}

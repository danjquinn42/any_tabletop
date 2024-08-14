import { ATDataType } from "./ATDataType";

export class ATKeyValuePairs extends ATDataType {
  value = {};

  constructor() {
    super("keyValuePairs");
  }
}

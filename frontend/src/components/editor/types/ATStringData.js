import { ATDataType } from "./ATDataType";

export class ATStringData extends ATDataType {
  value = "";

  constructor() {
    super("string");
  }
}

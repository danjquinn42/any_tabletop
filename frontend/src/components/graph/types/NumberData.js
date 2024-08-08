import { ATDataType } from "./ATDataType";
export class ATNumberData extends ATDataType {
  value = 0;

  constructor(type) {
    super(type);
  }
}

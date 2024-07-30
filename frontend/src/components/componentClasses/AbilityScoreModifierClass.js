import Constructable from "./Constructable";

export default class AbilityScoreModifierClass extends Constructable {
  constructor() {
    super();
  }
  derivedFormulaInput;
  displaySign;
  excludeStats;
  maxValue;
  minValue;
  roundDown;
  stats;
}

import { ATKeyValuePairs } from "../components/editor/types/ATKeyValuePairs";
import { ATNilData } from "../components/editor/types/ATNilData";
import { ATNodeData } from "../components/editor/types/ATNodeData";
import { ATNumberData } from "../components/editor/types/ATNumberData";
import { ATStringData } from "../components/editor/types/ATStringData";

export const HEX_ANGLE = (2 * Math.PI) / 6;

export const NODE_DATA_DEFAULT = {
  inputShortString: new ATNodeData(new ATNilData(), new ATStringData()),
  inputNumber: new ATNodeData(new ATNilData(), new ATNumberData()),
  inputNumberMap: new ATNodeData(new ATKeyValuePairs(), new ATKeyValuePairs(), {
    maxRow: 10,
  }),
  displayShortText: new ATNodeData(new ATStringData(), new ATStringData()),
  displayNumber: new ATNodeData(new ATNumberData(), new ATNumberData()),
  applyFormula: new ATNodeData(new ATNumberData(), new ATNumberData(), {
    formula: "x",
  }),
};

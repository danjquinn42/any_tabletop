export interface ScoreComponentConfig {
  id?: string;
  name: string;
  maxValue: number;
  minValue: number;
  derivedFormulaInput: string;
  roundDown: string;
  includeStats: boolean;
  includeModifiers: boolean;
  displaySign: boolean;
  stats: [
    {
      label: string;
      reference: string | null;
      modifierReference: string | null;
      index: number;
    },
  ];
}

export interface Stat {
  id: string;
  label: string;
  reference?: string;
  modifierReference?: string;
  value: number;
}

export interface Game {
  name: string;
  id: string;
}

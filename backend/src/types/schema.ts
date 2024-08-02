export interface GraphNode {
  identity: number;
  labels: string[];
  properties: any;
  elementId: string;
}

export interface NodeRelationship {
  identity: number;
  start: number;
  end: number;
  type: string;
  properties: any;
  elementId: string;
  startNodeElementId: string;
  endNodeElementId: string;
}

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

export interface ScoreComponentConfigNode extends GraphNode {
  properties: ScoreComponentConfig;
}

export interface Stat {
  id: string;
  label: string;
  reference?: string;
  modifierReference?: string;
  value: number;
}

export interface StatNode extends GraphNode {
  properties: Stat;
}

export interface Game {
  name: string;
  id: string;
  description: string;
}

export interface Mod {
  name: string;
  description: string;
  id: string;
}

export interface Root {}

export interface RootNode extends GraphNode {
  properties: Root;
}

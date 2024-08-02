export interface GraphNode<T> {
  identity: number;
  labels: string[];
  properties: T;
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
  stats: Stat[];
}

export interface Stat {
  id: string;
  index?: number;
  label: string;
  reference?: string;
  modifierReference?: string;
  value: number;
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

// This is for internal use only
export interface UnsecureInternalUserEntry {
  id: string;
  isProfileSetUp: boolean;
  googleId: string;
  name: string;
  username?: string;
  givenName?: string;
  familyName?: string;
  email?: string;
}

// This is the public facing user
export interface UserProfile {
  username?: string;
  isProfileSetUp: boolean;
  id: string;
}

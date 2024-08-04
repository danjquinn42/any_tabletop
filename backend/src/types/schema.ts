export interface GraphRecord<T> {
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
  stats: Stat[]; //TODO: remove

  statIds?: string[];
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
  configIds?: string[];
}

export interface Mod {
  name: string;
  description: string;
  id: string;

  gameIds?: string[];
}

export interface Root {
  id: string;
  entryModId?: string;
}

// This is for internal use only
export interface UnsecureInternalUserEntry {
  id: string;
  isProfileSetUp: boolean;
  googleId: string;
  displayName: string;
  givenName?: string;
  familyName?: string;
}

// This is the public facing user
export interface UserProfile {
  displayName: string;
  isProfileSetUp: boolean;
  id: string;
}

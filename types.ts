export enum ProjectMode {
  ORGANIC = 'ORGANIC',
  SEMI_DETACHED = 'SEMI_DETACHED',
  EMBEDDED = 'EMBEDDED',
}

export enum Rating {
  VERY_LOW = 'VERY_LOW',
  LOW = 'LOW',
  NOMINAL = 'NOMINAL',
  HIGH = 'HIGH',
  VERY_HIGH = 'VERY_HIGH',
  EXTRA_HIGH = 'EXTRA_HIGH',
}

export interface ModeConstants {
  a: number;
  b: number;
  c: number;
  d: number;
  label: string;
}

export interface DriverDefinition {
  id: string;
  name: string;
  description: string;
  ratings: Partial<Record<Rating, number>>; // Some ratings might not exist (null in PDF)
}

export interface DriverCategory {
  category: string;
  drivers: DriverDefinition[];
}

export interface CalculationResult {
  effort: number; // Person-Months
  time: number;   // Months
  staff: number;  // People
  productivity: number; // LOC/PM
  totalCost: number;
}
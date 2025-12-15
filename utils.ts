import { COST_DRIVERS, MODE_CONSTANTS_USER } from './constants';
import { ProjectMode, Rating } from './types';

export const calculateEAF = (selections: Record<string, Rating>): number => {
  let eaf = 1.0;

  COST_DRIVERS.forEach((category) => {
    category.drivers.forEach((driver) => {
      const selectedRating = selections[driver.id] || Rating.NOMINAL;
      const multiplier = driver.ratings[selectedRating];
      if (multiplier !== undefined) {
        eaf *= multiplier;
      }
    });
  });

  return eaf;
};

export const calculateCosts = (
  kloc: number,
  mode: ProjectMode,
  eaf: number,
  baseMonthlySalary: number
) => {
  const constants = MODE_CONSTANTS_USER[mode];
  
  // Effort in Person-Months
  // E = a * (KLOC ^ b) * EAF
  const effortNominal = constants.a * Math.pow(kloc, constants.b);
  const effortAdjusted = effortNominal * eaf;

  // Time in Months
  // TDEV = c * (Effort_Adjusted ^ d)
  const time = constants.c * Math.pow(effortAdjusted, constants.d);

  // Staff (Average Personnel)
  // Staff = Effort / Time
  const staff = time > 0 ? effortAdjusted / time : 0;

  // Productivity (LOC / PM)
  const productivity = effortAdjusted > 0 ? (kloc * 1000) / effortAdjusted : 0;

  // Cost Calculation with 5% Annual Inflation
  let totalCost = 0;
  let remainingTime = time;
  let currentMonthlySalary = baseMonthlySalary;
  let currentMonth = 0;

  // Calculate cost month by month
  while (remainingTime > 0) {
    const timeInThisBlock = remainingTime >= 1 ? 1 : remainingTime;
    
    // Apply cost for this month (Staff * Salary)
    totalCost += staff * currentMonthlySalary * timeInThisBlock;

    remainingTime -= timeInThisBlock;
    currentMonth++;

    // Every 12 months, salary increases by 5%
    if (currentMonth % 12 === 0) {
      currentMonthlySalary *= 1.05;
    }
  }

  return {
    effort: effortAdjusted,
    time,
    staff,
    productivity,
    totalCost
  };
};

export const formatCurrency = (amount: number): string => {
  // Changed to Colombian Pesos (COP)
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('es-CO', { maximumFractionDigits: 2 }).format(num);
};
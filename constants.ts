import { DriverCategory, ModeConstants, ProjectMode, Rating } from './types';

// Constants for Project Modes (Using specific values requested)
export const MODE_CONSTANTS: Record<ProjectMode, ModeConstants> = {
  [ProjectMode.ORGANIC]: { a: 3.2, b: 1.05, c: 2.50, d: 0.38, label: 'Orgánico' },
  [ProjectMode.SEMI_DETACHED]: { a: 3.0, b: 1.12, c: 2.50, d: 0.35, label: 'Semi-libre (Semi-acoplado)' },
  [ProjectMode.EMBEDDED]: { a: 2.8, b: 1.20, c: 2.50, d: 0.32, label: 'Rígido (Empotrado)' },
};

export const MODE_CONSTANTS_USER: Record<ProjectMode, ModeConstants> = {
  [ProjectMode.ORGANIC]: { a: 2.40, b: 1.05, c: 2.50, d: 0.38, label: 'Orgánico' },
  [ProjectMode.SEMI_DETACHED]: { a: 3.00, b: 1.12, c: 2.50, d: 0.35, label: 'Semi-libre' },
  [ProjectMode.EMBEDDED]: { a: 3.60, b: 1.20, c: 2.50, d: 0.32, label: 'Rígido (Empotrado)' },
};

export const RATING_LABELS: Record<Rating, string> = {
  [Rating.VERY_LOW]: 'Muy Bajo',
  [Rating.LOW]: 'Bajo',
  [Rating.NOMINAL]: 'Nominal',
  [Rating.HIGH]: 'Alto',
  [Rating.VERY_HIGH]: 'Muy Alto',
  [Rating.EXTRA_HIGH]: 'Extra Alto',
};

// Cost Drivers from standard COCOMO Intermediate Tables
export const COST_DRIVERS: DriverCategory[] = [
  {
    category: 'Atributos del Producto',
    drivers: [
      {
        id: 'RELY',
        name: 'Fiabilidad requerida (RELY)',
        description: 'Consecuencias de fallos del software',
        ratings: { [Rating.VERY_LOW]: 0.75, [Rating.LOW]: 0.88, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.15, [Rating.VERY_HIGH]: 1.40 },
      },
      {
        id: 'DATA',
        name: 'Tamaño Base de Datos (DATA)',
        description: 'Bytes por DSI',
        ratings: { [Rating.LOW]: 0.94, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.08, [Rating.VERY_HIGH]: 1.16 },
      },
      {
        id: 'CPLX',
        name: 'Complejidad del producto (CPLX)',
        description: 'Complejidad de control, cálculo y datos',
        ratings: { [Rating.VERY_LOW]: 0.70, [Rating.LOW]: 0.85, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.15, [Rating.VERY_HIGH]: 1.30, [Rating.EXTRA_HIGH]: 1.65 },
      },
    ],
  },
  {
    category: 'Atributos de la Computadora',
    drivers: [
      {
        id: 'TIME',
        name: 'Restricción tiempo ejecución (TIME)',
        description: '% de uso de CPU disponible',
        ratings: { [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.11, [Rating.VERY_HIGH]: 1.30, [Rating.EXTRA_HIGH]: 1.66 },
      },
      {
        id: 'STOR',
        name: 'Restricción almacenamiento (STOR)',
        description: '% de memoria disponible',
        ratings: { [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.06, [Rating.VERY_HIGH]: 1.21, [Rating.EXTRA_HIGH]: 1.56 },
      },
      {
        id: 'VIRT',
        name: 'Volatilidad máquina virtual (VIRT)',
        description: 'Frecuencia de cambios en la VM',
        ratings: { [Rating.LOW]: 0.87, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.15, [Rating.VERY_HIGH]: 1.30 },
      },
      {
        id: 'TURN',
        name: 'Tiempo de respuesta (TURN)',
        description: 'Tiempo de turno de la computadora',
        ratings: { [Rating.LOW]: 0.87, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.07, [Rating.VERY_HIGH]: 1.15 },
      },
    ],
  },
  {
    category: 'Atributos del Personal',
    drivers: [
      {
        id: 'ACAP',
        name: 'Capacidad del analista (ACAP)',
        description: 'Eficiencia y capacidad del equipo',
        ratings: { [Rating.VERY_LOW]: 1.46, [Rating.LOW]: 1.19, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.86, [Rating.VERY_HIGH]: 0.71 },
      },
      {
        id: 'AEXP',
        name: 'Experiencia en la aplicación (AEXP)',
        description: 'Meses de experiencia en apps similares',
        ratings: { [Rating.VERY_LOW]: 1.29, [Rating.LOW]: 1.13, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.91, [Rating.VERY_HIGH]: 0.82 },
      },
      {
        id: 'PCAP',
        name: 'Capacidad del programador (PCAP)',
        description: 'Habilidad y eficiencia de programación',
        ratings: { [Rating.VERY_LOW]: 1.42, [Rating.LOW]: 1.17, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.86, [Rating.VERY_HIGH]: 0.70 },
      },
      {
        id: 'VEXP',
        name: 'Experiencia en máquina virtual (VEXP)',
        description: 'Meses de experiencia con el sistema',
        ratings: { [Rating.VERY_LOW]: 1.21, [Rating.LOW]: 1.10, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.90 },
      },
      {
        id: 'LEXP',
        name: 'Experiencia en lenguaje (LEXP)',
        description: 'Meses de experiencia con el lenguaje',
        ratings: { [Rating.VERY_LOW]: 1.14, [Rating.LOW]: 1.07, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.95 },
      },
    ],
  },
  {
    category: 'Atributos del Proyecto',
    drivers: [
      {
        id: 'MODP',
        name: 'Prácticas modernas de prog. (MODP)',
        description: 'Uso de técnicas estructuradas',
        ratings: { [Rating.VERY_LOW]: 1.24, [Rating.LOW]: 1.10, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.91, [Rating.VERY_HIGH]: 0.82 },
      },
      {
        id: 'TOOL',
        name: 'Uso de herramientas (TOOL)',
        description: 'Automatización y herramientas CASE',
        ratings: { [Rating.VERY_LOW]: 1.24, [Rating.LOW]: 1.10, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 0.91, [Rating.VERY_HIGH]: 0.83 },
      },
      {
        id: 'SCED',
        name: 'Restricción de planificación (SCED)',
        description: '% de compresión del calendario',
        ratings: { [Rating.VERY_LOW]: 1.23, [Rating.LOW]: 1.08, [Rating.NOMINAL]: 1.00, [Rating.HIGH]: 1.04, [Rating.VERY_HIGH]: 1.10 },
      },
    ],
  },
];
// src/app/shared/data/options.ts
export type OptionId = number; // si preferís enum, también vale

export const OPTIONS: { id: OptionId; label: string }[] = [
  { id: 1, label: 'Baby boy' },
  { id: 2, label: 'Baby girl' },
  { id: 3, label: 'Baby decides' },
];

// 💡 Para cambiar las opciones, EDITÁ este array.
// Ejemplo:
// export const OPTIONS = [
//   { id: 1, label: 'Niña' },
//   { id: 2, label: 'Niño' },
//   { id: 3, label: 'Sorpresa' },
// ];

// src/app/shared/data/options.ts
export type OptionId = string; // ahora usamos los mismos strings que el backend

export const OPTIONS: { id: OptionId; label: string }[] = [
  { id: 'Baby boy', label: 'Baby boy' },
  { id: 'Baby girl', label: 'Baby girl' },
  { id: 'Baby decides', label: 'Baby decides' },
];

// 💡 Para cambiar las opciones, EDITÁ este array.
// Ejemplo:
// export const OPTIONS = [
//   { id: 'Niña', label: 'Niña' },
//   { id: 'Niño', label: 'Niño' },
//   { id: 'Sorpresa', label: 'Sorpresa' },
// ];

export interface VoteDTO {
  id?: string;            // asignado por el back
  name: string;
  option: 1 | 2 | 3;
  countryCode: string;    // ISO-2, p.ej. "AR", "ES"
  createdAt?: string;     // ISO
}
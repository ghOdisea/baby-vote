export interface VoteDTO {
id: string;
name: string;
option: string; // ← string ahora
countryCode: string;
createdAt: string;
}


export interface ApiVote {
id: string;
name: string;
country_code: string;
option: string; // ← string en la API
created_at: string;
}


export interface ApiStatsRow { option: string; count: number; }
export interface ApiStatsResponse { totals: ApiStatsRow[]; }
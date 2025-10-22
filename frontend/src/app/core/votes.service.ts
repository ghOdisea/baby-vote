import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, timer, switchMap, shareReplay, tap } from 'rxjs';
import { environment } from '../environments/environments';
import { ApiVote, ApiStatsResponse, VoteDTO } from '../shared/models/vote';


function toDTO(v: ApiVote): VoteDTO {
return { id: v.id, name: v.name, option: v.option, countryCode: v.country_code, createdAt: v.created_at };
}


function sortDescByDate(list: VoteDTO[]): VoteDTO[] {
return [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}


@Injectable({ providedIn: 'root' })
export class VotesService {
private http = inject(HttpClient);


// estado interno
private readonly votes$ = new BehaviorSubject<VoteDTO[]>([]);


// exposición pública
readonly allVotes$ = this.votes$.asObservable();


// Totales desde el back (/api/stats). Rellena en 0 las opciones que falten en la respuesta.
readonly totals$ = timer(0, 5000).pipe(
	switchMap(() => this.http.get<ApiStatsResponse>(`${environment.apiBaseUrl}/stats`)),
	map(res => {
		// Build a map keyed by the option value as string (backend may return numbers as strings
		// or new string identifiers). This keeps totals flexible to option id type changes.
		const map: Record<string, number> = {};
		let sum = 0;
		res.totals.forEach(row => {
			const key = String(row.option);
			const count = Number(row.count) || 0;
			map[key] = count;
			sum += count;
		});
		return { totals: map, total: sum };
	}),
	shareReplay({ bufferSize: 1, refCount: true })
);


// Polling de votos para panel/listas (/api/votes)
readonly pollVotes$ = timer(0, 5000).pipe(
	// backend returns { votes: ApiVote[] }
	switchMap(() => this.http.get<{ votes: ApiVote[] }>(`${environment.apiBaseUrl}/votes`)),
	map(res => (res.votes || []).map(toDTO)),
	map(sortDescByDate),
	tap(list => this.votes$.next(list)),
	shareReplay({ bufferSize: 1, refCount: true })
);


/** POST /api/votes – envío optimista y consolidación con el creado real */
submitVote(vote: { name: string; option: string; countryCode: string }): Observable<VoteDTO> {
// optimismo: opcional – si no te gusta, eliminá estas 3 líneas
const optimistic: VoteDTO = { id: crypto.randomUUID(), name: vote.name, option: vote.option, countryCode: vote.countryCode, createdAt: new Date().toISOString() };
this.votes$.next(sortDescByDate([optimistic, ...this.votes$.value]));


return this.http.post<{ message: string; vote: ApiVote }>(`${environment.apiBaseUrl}/votes`, {
name: vote.name,
option: vote.option,
country_code: vote.countryCode
}).pipe(
map(r => toDTO(r.vote)),
tap(created => {
// Reemplaza el optimista por el real. Si quitaste el optimismo, simplemente push.
const withoutOptimistic = this.votes$.value.filter(v => v !== optimistic);
this.votes$.next(sortDescByDate([created, ...withoutOptimistic]));
})
);
}
}
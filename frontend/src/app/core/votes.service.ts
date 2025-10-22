import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  delay, map, of,  shareReplay, timer } from 'rxjs';
import { VoteDTO } from '../shared/models/vote';
import { RealtimeEvent } from '../shared/models/realtime-event';


@Injectable({ providedIn: 'root' })
export class VotesService {
// stream principal de votos
private readonly votes$ = new BehaviorSubject<VoteDTO[]>([]);


// mock: generador de eventos en vivo (se puede desactivar)
private mockEnabled = true;


// exposición pública
readonly allVotes$ = this.votes$.asObservable();
readonly totals$ = this.allVotes$.pipe(
map(list => ({
1: list.filter(v => v.option === 1).length,
2: list.filter(v => v.option === 2).length,
3: list.filter(v => v.option === 3).length,
total: list.length,
})),
shareReplay({ bufferSize: 1, refCount: true })
);


constructor() {
// arrancá con mock (podés quitarlo cuando integres el back)
if (this.mockEnabled) this.startMockRealtime();
}


/** Registrar voto (mock). Reemplazá por HTTP POST a tu back. */
submitVote(vote: Omit<VoteDTO, 'id' | 'createdAt'>): Observable<VoteDTO> {
const created: VoteDTO = {
id: crypto.randomUUID(),
createdAt: new Date().toISOString(),
...vote,
};
// actualiza localmente & emite como si viniera del realtime
this.votes$.next([created, ...this.votes$.value]);
return of(created).pipe(delay(300));
}


/** Conexión SSE/WS real: llamá esto en App init o en páginas */
connectRealtime(): void {
// Ejemplo SSE real (cuando tengas endpoint):
// const es = new EventSource(`${environment.sseUrl}`);
// es.onmessage = (ev) => {
// const evt: RealtimeEvent = JSON.parse(ev.data);
// if (evt.type === 'vote_created') this.votes$.next([evt.data, ...this.votes$.value]);
// };
}


/** Mock: genera votos aleatorios cada tanto */
private startMockRealtime(): void {
const names = ['Ana', 'Luis', 'María', 'Sofía', 'Pedro', 'Lucía', 'Diego', 'Valentina'];
const countries = ['AR','ES','MX','CL','CO','UY','PE','BR','US','FR'];


timer(1500, 4000).subscribe(() => {
  const created: VoteDTO = {
  id: crypto.randomUUID(),
  name: names[Math.floor(Math.random()*names.length)],
  option: (1 + Math.floor(Math.random()*3)) as 1|2|3,
  countryCode: countries[Math.floor(Math.random()*countries.length)],
  createdAt: new Date().toISOString(),
  }
})
}}

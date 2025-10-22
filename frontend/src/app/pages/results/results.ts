import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesService } from '../../core/votes.service';
import { countryCodeToFlagEmoji } from '../../shared/utils/flag';
import { OPTIONS } from '../../shared/data/options';


@Component({
selector: 'app-results',
standalone: true,
imports: [CommonModule],
templateUrl: './results.html',
styleUrls: ['./results.scss']
})
export class ResultsComponent implements OnInit {
flag = countryCodeToFlagEmoji;
private readonly svc = inject(VotesService);
votes$ = this.svc.allVotes$;
totals$ = this.svc.totals$;

// Normalized options: ensure { id: string, label: string } shape so templates can
// work regardless of whether OPTIONS entries are objects or plain strings, and
// whether their id is number or string.
options = (OPTIONS as (string | { id: string | number; label: string })[]).map(o => {
    if (typeof o === 'string') return { id: String(o), label: o };
    return { id: String(o.id), label: o.label };
});

ngOnInit(): void {
    this.svc.pollVotes$.subscribe();
}
}
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesService } from '../../core/votes.service';
import { countryCodeToFlagEmoji } from '../../shared/utils/flag';


@Component({
selector: 'app-results',
standalone: true,
imports: [CommonModule],
templateUrl: './results.html',
styleUrls: ['./results.scss']
})
export class ResultsComponent {
flag = countryCodeToFlagEmoji;
private readonly svc = inject(VotesService);
votes$ = this.svc.allVotes$;
totals$ = this.svc.totals$;
}
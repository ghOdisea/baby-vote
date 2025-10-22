import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotesService } from '../../core/votes.service';
import { countryCodeToFlagEmoji } from '../../shared/utils/flag';


@Component({
selector: 'app-live-panel',
standalone: true,
imports: [CommonModule],
templateUrl: './live-panel.html',
styleUrls: ['./live-panel.scss']
})
export class LivePanelComponent {
flag = countryCodeToFlagEmoji;
private readonly svc = inject(VotesService);
votes$ = this.svc.allVotes$; // stream en vivo
}
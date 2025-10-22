import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VotesService } from '../../core/votes.service';
import { COUNTRIES } from '../../shared/data/countries';
import { countryCodeToFlagEmoji } from '../../shared/utils/flag';
import { LivePanelComponent } from '../../components/live-panel/live-panel';


@Component({
selector: 'app-vote',
standalone: true,
imports: [CommonModule, ReactiveFormsModule, LivePanelComponent],
templateUrl: './vote.html',
styleUrls: ['./vote.scss']
})
export class VoteComponent implements OnInit {
countries = COUNTRIES;
flag = countryCodeToFlagEmoji;


submitting = signal(false);
success = signal(false);

private fb = inject(FormBuilder);
public votes = inject(VotesService);

form = this.fb.group({
name: ['', [Validators.required, Validators.minLength(2)]],
option: [null as 1|2|3|null, [Validators.required]],
countryCode: ['', [Validators.required]],
});


ngOnInit(): void {
this.votes.connectRealtime(); // no hace nada en mock; listo para back real
}


setOption(opt: 1|2|3) { this.form.patchValue({ option: opt }); }


submit() {
if (this.form.invalid) { this.form.markAllAsTouched(); return; }
this.submitting.set(true);
const { name, option, countryCode } = this.form.value;
this.votes.submitVote({ name: name!, option: option!, countryCode: countryCode! }).subscribe({
next: () => {
this.success.set(true);
this.submitting.set(false);
},
error: () => {
alert('No pudimos registrar tu voto. Probá de nuevo.');
this.submitting.set(false);
}
});
}


reset() {
this.form.reset();
this.success.set(false);
}
}
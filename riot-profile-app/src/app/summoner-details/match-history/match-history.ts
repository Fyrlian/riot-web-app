import { Component, Input } from '@angular/core';
import { MatchDto } from '../../models/match-history.info';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-history',
  imports: [CommonModule],
  templateUrl: './match-history.html',
  styleUrl: './match-history.css'
})
export class MatchHistory {

  // the data used on Input is declared on the HTML of the father component
  @Input() matchHistory!: MatchDto[] | null;

}

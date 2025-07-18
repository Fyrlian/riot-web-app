import { Component, Input, Output } from '@angular/core';
import { LeagueInfoDTO } from '../../models/league.info';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-league-info',
  standalone: true,
  imports: [],
  templateUrl: './league-info.html',
  styleUrl: './league-info.css'
})
export class LeagueInfo {
  // the data used on Input is declared on the HTML of the father component
  @Input() leagueInfo!: LeagueInfoDTO | null;

  @Output() queueTypeChanged = new EventEmitter<string>();

  onQueueTypeChange(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  this.queueTypeChanged.emit(selectElement.value);
}
}

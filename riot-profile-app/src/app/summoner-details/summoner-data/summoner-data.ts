import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummonerInfoDTO } from '../../models/summoner.info';


@Component({
  selector: 'app-summoner-data',
  standalone: true,
  imports: [],
  templateUrl: './summoner-data.html',
  styleUrl: './summoner-data.css'
})
export class SummonerData {

  // the data used on Input is declared on the HTML of the father component
  @Input() summonerInfo!: SummonerInfoDTO | null;

}

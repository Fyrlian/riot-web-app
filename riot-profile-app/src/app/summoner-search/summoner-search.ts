import { Component } from '@angular/core';
import { Router, RouterModule  } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SummonerService } from '../summoner.service';
import { SummonerInfoDTO } from '../models/summoner.info';
import { SummonerStateService } from '../summoner-state.service';
import { LeagueInfoDTO } from '../models/league.info';


@Component({
  selector: 'app-summoner-search',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './summoner-search.html',
  styleUrls: ['./summoner-search.css']
})
export class SummonerSearch {
  protected title = 'summoner search';

  constructor(
    private summonerService:SummonerService,
    private router: Router,
    private stateService: SummonerStateService
  ){}

  summonerName: string = '';
  region: string = '';
  summonerTag: string = '';
  queueType: string = 'RANKED_SOLO_5x5'     //modify in the future to choose the queue type

  summonerInfo: SummonerInfoDTO | null = null;
  leagueInfo: LeagueInfoDTO |null = null;

  sendInfo() {
  this.router.navigate([
    '/details',
    this.region,
    this.summonerName,
    this.summonerTag
  ]);
}
}


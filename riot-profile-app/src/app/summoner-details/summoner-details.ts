import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummonerInfoDTO } from '../models/summoner.info';
import { CommonModule } from '@angular/common';
import { SummonerStateService } from '../summoner-state.service';
import { LeagueInfo } from './league-info/league-info';
import { MatchHistory } from './match-history/match-history';
import { SummonerData } from './summoner-data/summoner-data';
import { LeagueInfoDTO } from '../models/league.info';
import { SummonerService } from '../summoner.service';
import { MatchDto } from '../models/match-history.info';

@Component({
  selector: 'app-summoner-details',
  standalone: true,
  templateUrl: './summoner-details.html',
  styleUrls: ['./summoner-details.css'],
  imports: [CommonModule,LeagueInfo,MatchHistory,SummonerData]
})

export class SummonerDetails implements OnInit {
  summonerInfo: SummonerInfoDTO | null = null;
  leagueInfo: LeagueInfoDTO | null = null;
  currentQueueType: string = 'RANKED_SOLO_5x5';
  matchHistory: MatchDto[] = [];
  count: number = 20;
  queue: number = 420;

  constructor(private stateService: SummonerStateService, private summonerService: SummonerService, private route: ActivatedRoute,) {}

  //when the route is used it takes the param queries and use it for the components
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log('Init')
      const region = params.get('region');
      const name = params.get('gameName');
      const tag = params.get('tagLine');
      console.log('consts:',region,name,tag)

      if (region && name && tag) {
        this.summonerService.getSummonerInfo(region, name, tag).subscribe({
          next: data => {
            this.summonerInfo = data;
            this.loadLeagueInfo(region, name, tag, this.currentQueueType);
            this.loadMatchHistory(region,name,tag,this.count, this.queue)
            //(region:string,name:string,tag:string,queueType:string,count:number)
          },
          error: err => console.error('Error obtaining the summoner', err)
        });
      }
    });
  }

  onQueueTypeChange(queueType: string) {
    this.matchHistory = [];
    this.currentQueueType = queueType;
    if (this.summonerInfo) {
      const region = this.route.snapshot.paramMap.get('region')!;
      const name = this.route.snapshot.paramMap.get('gameName')!;
      const tag = this.route.snapshot.paramMap.get('tagLine')!;
      this.loadLeagueInfo(region, name, tag, queueType);
      if(this.currentQueueType == "RANKED_SOLO_5x5"){
        this.queue = 420;
      }else{
        this.queue = 440;
      }
      this.loadMatchHistory(region,name,tag,20,this.queue);
    }
  }

  loadLeagueInfo(region: string, name: string, tag: string, queueType: string) {
    this.summonerService.getLeagueInfo(region, name, tag, queueType).subscribe({
      next: league => {
        console.log('league info: ', league);
        this.leagueInfo = league;
      },
      error: err => console.error('error obtainig rank', err)
    });
  }

  //loads the matchHistory on an array
  loadMatchHistory(region:string,name:string,tag:string,count:number,queue:number){
      count = this.count; //modify in case of loading more games
      //gets the list of string related to the match
      this.summonerService.getMatches(region,name,tag,this.count,this.queue).subscribe({
      next: ids => {
        console.log("id queue sent: ",this.queue," - number of ids received: ",ids.length," - info: ",ids)
        //iterates the id of the games and stores the information on the list
        ids.forEach(id => {
          //gets the info
          this.summonerService.getMatchInfo(region,id).subscribe({
            next: match => {
              this.matchHistory?.push(match); //adds the match to the list
            },
            error: err => console.error('Error when obtaining the info about a match', err)
          });
        });
      },
      error: err => console.error('Error when obtaining the matches ID on summoner controller', err)
    });  
  console.log("GAME LIST:",this.matchHistory);
  }
  
}

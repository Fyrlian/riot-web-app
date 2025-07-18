import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SummonerInfoDTO } from './models/summoner.info';
import { LeagueInfoDTO } from './models/league.info';

//services that allows connection to the back (.net)
@Injectable({ providedIn: 'root' })                         //allows to inject the class in other components or services using Singleton patterns

//clase que permite hacer llamadas http
export class SummonerService {
  private apiUrl = 'http://localhost:5152/api/summoner';    //back route where it's going to make the connection

  constructor(private http: HttpClient) {}  //injects the dependency that allows the connection with the backend
  
  //gets summoner info (puuid, name...)
  getSummoner(region: string, gameName: string, tagLine: string) {
    return this.http.get(`${this.apiUrl}/${region}/${gameName}/${tagLine}/deprecated`);
  }

  //gets summoner info such as icon ID, level... 
  getSummonerInfo(region: string, gameName: string, tagLine: string) {
    return this.http.get<SummonerInfoDTO>(`${this.apiUrl}/${region}/${gameName}/${tagLine}/summoner`);
  }

  //gets info about ranking and series
  getLeagueInfo(region:string, gameName:string, tagLine:string, queueType:string){
    return this.http.get<LeagueInfoDTO>(`${this.apiUrl}/${region}/${gameName}/${tagLine}/${queueType}`);
  }
}

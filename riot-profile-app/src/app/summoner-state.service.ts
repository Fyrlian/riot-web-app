//this file will be used to manage the information of a summoner
import { Injectable } from "@angular/core";
import { SummonerInfoDTO } from "./models/summoner.info";
import { LeagueInfoDTO } from "./models/league.info";

@Injectable({ providedIn: 'root' })                         //allows to inject the class in other components or services using Singleton patterns

export class SummonerStateService{
    private _summonerInfo: SummonerInfoDTO | null = null;      //the object we're going to manage
    private _leagueInfo: LeagueInfoDTO | null = null;

    setSummonerInfo(info:SummonerInfoDTO):void{                //setter to set info about the summoner
        this._summonerInfo = info;
    }

    getSummonerInfo():SummonerInfoDTO | null{                  //getter to get info about the summoner
        return this._summonerInfo;
    }

    setLeagueInfo(info:LeagueInfoDTO):void{
        this._leagueInfo = info;
    }

    getLeagueInfo():LeagueInfoDTO | null{                  //getter to get info about the summoner
        return this._leagueInfo;
    }

}
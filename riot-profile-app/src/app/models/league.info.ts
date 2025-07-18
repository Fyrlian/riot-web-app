import { MiniSeriesDTO } from "./miniseries.info";

export interface LeagueInfoDTO {
    leagueId: string;      
    puuid: string;        
    queueType: string;     
    tier: string;          
    rank: string;          
    leaguePoints: number;  
    wins: number;          
    losses: number;        
    hotStreak: boolean;    
    veteran: boolean;      
    freshBlood: boolean;   
    inactive: boolean;     
    miniSeries: MiniSeriesDTO; 
    winrate:number;
  }
import { Routes } from '@angular/router';
import { SummonerSearch} from './summoner-search/summoner-search';
import { SummonerDetails } from './summoner-details/summoner-details';

export const routes: Routes = [
  { path: '', component: SummonerSearch },
  { path: 'details/:region/:gameName/:tagLine', component: SummonerDetails }
];

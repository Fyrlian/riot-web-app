import { ParticipantDto } from './participants.info';
import { TeamDto } from './team.info';

export interface InfoDto {
    gameCreation: number;
    gameDuration: number;
    gameId: number;
    gameMode: string;
    gameStartTimestamp: number;
    gameType: string;
    gameVersion: string;
    mapId: number;
    participants: ParticipantDto[];
    platformId: string;
    queueId: number;
    teams: TeamDto[];
    tournamentCode: string;
}

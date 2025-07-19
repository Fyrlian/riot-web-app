import { ObjectivesDto } from './objectives.info';
import { BanDto } from './ban.info';

export interface TeamDto {
    teamId: number;
    win: boolean;
    objectives: ObjectivesDto;
    bans: BanDto[];
}
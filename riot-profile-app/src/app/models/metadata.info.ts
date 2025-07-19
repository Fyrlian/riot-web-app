import { ParticipantDto } from './participants.info';

export interface MetadataDto {
    dataVersion: string;
    matchId: string;
    participants: ParticipantDto[];
}

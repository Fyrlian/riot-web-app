import { MetadataDto } from './metadata.info';
import { InfoDto } from './gameInfo.info';

export interface MatchDto {
    metadata: MetadataDto;
    info: InfoDto;
}
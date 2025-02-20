import { IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PlayerDto } from './player-dto';

export class RoomDto {
    @IsString()
    @MaxLength(5)
    roomId!: string;

    @Type(() => PlayerDto)
    player!: PlayerDto;
}

import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class CardDto {
    @IsString()
    @IsEnum(['red', 'yellow', 'green', 'blue', 'black'])
    color!: 'red' | 'yellow' | 'green' | 'blue' | 'black';

    @IsOptional()
    @IsNumber()
    value?: number;

    @IsOptional()
    @IsString()
    @IsEnum(['skip', 'reverse', 'draw2', 'draw4', 'wild'])
    action?: 'skip' | 'reverse' | 'draw2' | 'draw4' | 'wild';
}

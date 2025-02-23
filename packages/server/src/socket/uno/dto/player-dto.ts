import { IsEmail, IsString, MaxLength } from 'class-validator';

export class PlayerDto {
    @IsEmail()
    id!: number;

    @IsString()
    @MaxLength(10)
    name!: string;

    @IsString()
    avatar?: string;
}

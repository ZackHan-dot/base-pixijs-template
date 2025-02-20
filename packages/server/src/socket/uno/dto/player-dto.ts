import { IsEmail, IsString, MaxLength } from 'class-validator';

export class PlayerDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MaxLength(10)
    name!: string;
}

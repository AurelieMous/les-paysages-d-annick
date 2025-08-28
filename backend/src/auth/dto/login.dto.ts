import { IsEmail, IsString } from 'class-validator';

export class UpdateAuthDto {
    @IsEmail({}, { message: 'L\'email doit être valide' })
    email: string;

    @IsString({ message: 'Le nouveau mot de passe est obligatoire' })
    password: string;
}

// Mise à jour du profile ADMIN
import { IsString, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsEmail({}, { message: 'L\'email doit être valide' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
    @MaxLength(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' })
    name?: string;

}
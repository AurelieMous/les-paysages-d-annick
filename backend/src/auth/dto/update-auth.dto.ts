import { IsString, MaxLength, IsOptional, IsBoolean, IsEnum, IsEmail } from 'class-validator';
import { AdminRole } from '@prisma/client';
// mise à jour du profil moderateur par l'admin

export class UpdateAuthDto {
    @IsOptional()
    @IsEmail({}, { message: 'L\'email doit être valide' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Le prénom doit être une chaîne de caractères' })
    @MaxLength(50, { message: 'Le prénom ne peut pas dépasser 50 caractères' })
    firstName?: string;

    @IsOptional()
    @IsString({ message: 'Le nom doit être une chaîne de caractères' })
    @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
    lastName?: string;

    @IsOptional()
    @IsBoolean({ message: 'Le statut actif doit être un booléen' })
    isActive?: boolean;

    @IsOptional()
    @IsEnum(AdminRole, { message: 'Le rôle doit être ADMIN ou MODERATOR' })
    role?: AdminRole;
}
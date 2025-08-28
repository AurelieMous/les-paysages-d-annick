// src/auth/dto/reset-password.dto.ts
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
    @IsString({ message: 'Le nouveau mot de passe est obligatoire' })
    @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
    @MaxLength(50, { message: 'Le mot de passe ne peut pas dépasser 50 caractères' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial' }
    )
    newPassword: string;
}
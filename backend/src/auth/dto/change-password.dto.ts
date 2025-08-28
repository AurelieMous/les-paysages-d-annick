// Changer un mot de passe
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ChangePasswordDto {
    @IsString({ message: 'L\'ancien mot de passe est obligatoire' })
    currentPassword: string;

    @IsString({ message: 'Le nouveau mot de passe est obligatoire' })
    @MinLength(8, { message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' })
    @MaxLength(50, { message: 'Le nouveau mot de passe ne peut pas dépasser 50 caractères' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        { message: 'Le nouveau mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial' }
    )
    newPassword: string;
}
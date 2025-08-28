// create-album.dto.ts
import { IsString, IsOptional, MaxLength } from 'class-validator';

export class CreateAlbumDto {
    @IsString({ message: 'Le titre est obligatoire' })
    @MaxLength(100, { message: 'Le titre ne peut pas dépasser 100 caractères' })
    title: string;

    @IsOptional()
    @IsString({ message: 'La description doit être une chaîne de caractères' })
    @MaxLength(500, { message: 'La description ne peut pas dépasser 500 caractères' })
    description?: string;

    // Supprimez photo: [] - les photos seront ajoutées séparément
}
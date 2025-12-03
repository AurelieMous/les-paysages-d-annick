import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Début du seed...');

    // Nettoyer la base de données
    await prisma.photo.deleteMany();
    await prisma.album.deleteMany();
    await prisma.user.deleteMany();

    console.log('🗑️  Base de données nettoyée');

    // Créer un utilisateur
    const passwordHash = await bcrypt.hash('password123', 10);

    const user = await prisma.user.create({
        data: {
            email: 'john.doe@example.com',
            passwordHash,
            role: "admin",
        },
    });

    console.log('✅ Utilisateur créé:', user.email);

    // Créer un album
    const album = await prisma.album.create({
        data: {
            title: 'Vacances à Marseille',
            description: 'Photos de mes vacances au bord de la Méditerranée',
            ownerId: user.id,
        },
    });

    console.log('✅ Album créé:', album.title);

    // Créer 2 photos
    const photo1 = await prisma.photo.create({
        data: {
            title: 'Vue sur le Vieux-Port',
            description: 'Magnifique coucher de soleil sur le port de Marseille',
            albumId: album.id,
            fileIdHd: '1a2b3c4d5e6f7g8h9i0j_HD',
            fileIdThumb: '1a2b3c4d5e6f7g8h9i0j_THUMB',
            urlHd: 'https://drive.google.com/uc?id=1a2b3c4d5e6f7g8h9i0j_HD',
            urlThumb: 'https://drive.google.com/uc?id=1a2b3c4d5e6f7g8h9i0j_THUMB',
            exif: {
                camera: 'Canon EOS R6',
                lens: 'RF 24-105mm F4 L IS USM',
                iso: 200,
                shutterSpeed: '1/250',
                aperture: 'f/8',
                focalLength: '35mm',
                dateTaken: '2024-08-15T18:30:00Z',
            },
        },
    });

    console.log('✅ Photo 1 créée:', photo1.title);

    const photo2 = await prisma.photo.create({
        data: {
            title: 'Calanques de Cassis',
            description: 'Randonnée dans les magnifiques calanques',
            albumId: album.id,
            fileIdHd: '9z8y7x6w5v4u3t2s1r0q_HD',
            fileIdThumb: '9z8y7x6w5v4u3t2s1r0q_THUMB',
            urlHd: 'https://drive.google.com/uc?id=9z8y7x6w5v4u3t2s1r0q_HD',
            urlThumb: 'https://drive.google.com/uc?id=9z8y7x6w5v4u3t2s1r0q_THUMB',
            exif: {
                camera: 'Canon EOS R6',
                lens: 'RF 24-105mm F4 L IS USM',
                iso: 100,
                shutterSpeed: '1/500',
                aperture: 'f/11',
                focalLength: '24mm',
                dateTaken: '2024-08-16T11:15:00Z',
            },
        },
    });

    console.log('✅ Photo 2 créée:', photo2.title);

    // Définir la photo 1 comme photo de couverture de l'album
    await prisma.album.update({
        where: { id: album.id },
        data: {
            coverPhotoId: photo1.id,
        },
    });

    console.log('✅ Photo de couverture définie pour l\'album');

    console.log('\n🎉 Seed terminé avec succès!');
    console.log(`📊 Résumé:
  - 1 utilisateur créé
  - 1 album créé
  - 2 photos créées
  - Photo de couverture définie`);
}

main()
    .catch((e) => {
        console.error('❌ Erreur lors du seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
# Cahier des charges — Application Web Photographe

**Stack choisi (actuel)**: Frontend React + TypeScript (Vite), Backend Node.js (NestJS/Express), Base de données PostgreSQL (Prisma), Stockage images : Google Drive (15 Go gratuit) via API backend.

---

## 1. Contexte & objectifs

Créer une application web vitrine pour une photographe permettant de :

* Présenter son travail (site vitrine)
* Organiser et partager des photos via des **albums** consultables
* Chaque photo dispose d'une page détail (titre + description)
* La photographe peut créer, modifier et supprimer albums et photos depuis un back-office
* Les images sont traitées (compression, redimensionnement, suppression métadonnées) dans le backend puis stockées sur Google Drive (MVP / prototype)

**Contraintes importantes**

* Backend responsable des uploads et traitements (Sharp)
* Frontend ne communique jamais directement avec Google Drive
* Prévoir modularité pour migrer vers S3/CDN si besoin

---

## 2. Périmètre fonctionnel

### 2.1 Front-office (visiteurs)

* Page d'accueil (présentation + albums récents)
* Page liste des albums (vignette + titre + date)
* Page album : galerie paginée / lazy loading
* Page photo : image HD (URL optimisée), titre, description, navigation prev/next
* Page contact (formulaire) — optionnel hors MVP

### 2.2 Back-office (admin)

* Authentification admin (email + mot de passe)
* CRUD Albums (titre, description, image de couverture)
* CRUD Photos : upload, titre, description, assignation album
* Upload multiple supporté (front: multi-select, backend: file queue)
* Gestion des droits (uniquement l'admin peut modifier)

### 2.3 Non-fonctionnel

* Responsive mobile-first
* Temps de chargement optimisé (lazy loading, CDN si possible)
* Sauvegardes régulières de la BDD
* Logs d'upload et erreurs

---

## 3. MVP (Minimum Viable Product)

Fonctionnalités minimales pour mise en production du prototype :

* Front: listing albums, page album, page photo, navigation
* Back: auth admin, endpoints CRUD albums/photos, pipeline d'optimisation, upload vers Google Drive
* Stockage: Google Drive (compte de service) ; DB: PostgreSQL (Prisma)
* Monitoring minimal (Sentry ou logs)

---

## 4. Architecture technique & pipeline d'upload

### 4.1 Architecture générale

```
[React + TypeScript (Vite) - Front]  <--HTTPS-->  [API REST (NestJS/Express) - Backend]
                                                  |
                                                  v
                                       Google Drive (dossier dédié / compte de service)
                                                  |
                                                  v
                                            PostgreSQL (Prisma ORM)
```

### 4.2 Pipeline d'upload (détail)

1. L'admin sélectionne une photo(s) dans l'UI admin et envoie via `POST /api/photos/upload`.
2. Backend reçoit le fichier temporairement (multer / busboy) et stocke en tmp.
3. Backend lance Sharp :
   * génère `thumb` (ex: 300 px large)
   * génère `web` optimisé (max largeur 2048 px)
   * convertit en WebP (optionnel) ou JPEG optimisé
   * supprime métadonnées EXIF si inutiles
4. Backend appelle Google Drive API : upload des versions optimisées dans un dossier dédié (parents).
5. Google Drive renvoie `fileId`(s) ; backend peut aussi créer un lien de partage public en lecture seule (ou utiliser un service intermédiaire pour proxy).
6. Backend enregistre en BDD : références `fileId` (thumb et web), URLs publiques (si crées), titre, description, albumId, métadonnées.
7. Front récupère via l'API backend les URLs optimisées et les affiche.

---

## 5. Sécurité et bonnes pratiques

* Ne jamais exposer la clé JSON du compte de service Google côté client
* Stocker la clé JSON et secrets dans des variables d'environnement (ex: Vault, secrets manager, ou CI/CD variables)
* Auth: JWT + cookies httpOnly ou sessions serveur selon préférence
* Rate limiting pour endpoints d'upload
* Validation des types MIME et taille max upload (ex: 15-20 MB par fichier)
* Scan antivirus optionnel pour uploads (ClamAV) si public ouvert

---

## 6. Use Case (diagramme)

```mermaid
%% Use case diagram - acteurs : Visitor, Admin
usecaseDiagram
  actor Visitor as V
  actor Admin as A

  V --> (View Home)
  V --> (View Albums)
  V --> (View Album Detail)
  V --> (View Photo Detail)

  A --> (Login)
  A --> (Create Album)
  A --> (Edit Album)
  A --> (Delete Album)
  A --> (Upload Photo)
  A --> (Edit Photo)
  A --> (Delete Photo)
```

---

## 7. ERD (Entity Relationship Diagram simplifié)

```mermaid
erDiagram
  USER ||--o{ ALBUM : owns
  ALBUM ||--o{ PHOTO : contains

  USER {
    int id PK
    string email
    string passwordHash
    datetime createdAt
  }
  ALBUM {
    int id PK
    string title
    string description
    int ownerId FK
    int coverPhotoId FK NULL
    datetime createdAt
  }
  PHOTO {
    int id PK
    string title
    string description
    int albumId FK
    string fileIdHd
    string fileIdThumb
    string urlHd NULL
    string urlThumb NULL
    json exif NULL
    datetime createdAt
  }
```

> Note : l'entité `File` a été fusionnée avec `Photo` pour simplifier. Les colonnes `fileIdHd` et `fileIdThumb` stockent directement les identifiants Google Drive des images HD et miniature.

---

## 8. Modèle Prisma (proposition)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  role         String   @default("admin")
  createdAt    DateTime @default(now())
  albums       Album[]
}

model Album {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  owner       User     @relation(fields: [ownerId], references: [id])
  ownerId     Int
  coverPhoto  Photo?   @relation("AlbumCover", fields: [coverPhotoId], references: [id])
  coverPhotoId Int?
  photos      Photo[]
  createdAt   DateTime @default(now())
}

model Photo {
  id          Int      @id @default(autoincrement())
  title       String?
  description String?
  album       Album    @relation(fields: [albumId], references: [id])
  albumId     Int
  fileIdHd    String   // Google Drive fileId for HD version
  fileIdThumb String   // Google Drive fileId for thumbnail
  urlHd       String?  // optional : public URL if generated
  urlThumb    String?  // optional : public URL if generated
  exif        Json?    // optional metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([albumId])
}
```

---

## 9. Endpoints API recommandés

* `POST /api/auth/login` → retourne JWT
* `GET /api/albums` → liste albums
* `GET /api/albums/:id` → détail album + photos
* `POST /api/albums` → créer album
* `PUT /api/albums/:id` → modifier album
* `DELETE /api/albums/:id` → supprimer album
* `POST /api/photos/upload` → upload(s) (admin)
* `PUT /api/photos/:id` → modifier photo
* `DELETE /api/photos/:id` → supprimer photo


## 10. Possibilités d'amélioration futures

* Ajout de filtres par tags, catégories, ou date
* Système de tri et recherche avancée
* Gestion multi-utilisateurs et rôles différents
* Optimisation SEO et partage réseaux sociaux
* Mise en place d'un CDN pour les images (migration vers S3, Cloudflare R2)
* Gestion d'archives et suppression automatique d'anciens fichiers
* Ajout d’un mode client avec galerie privée ou payante
* Multi-langue et localisation

---

## 11. Mise en production (Docker + serveur OVH + nom de domaine)

### 11.1 Pré-requis

* Serveur VPS ou cloud OVH avec Docker et Docker Compose installés
* Nom de domaine configuré pour pointer vers le serveur (DNS A/AAAA records)
* Certificat SSL (Let's Encrypt) pour HTTPS

### 11.2 Étapes

1. Créer des Dockerfiles pour frontend et backend :
   * Frontend React TS buildé et servi via Nginx
   * Backend Node.js exposant l'API REST
2. Docker Compose pour orchestrer les services :
   * Frontend, Backend, PostgreSQL
   * Volume pour persister la BDD
3. Configuration environnement :
   * Variables pour DB, clés Google Drive, JWT secret
4. Build des images et démarrage des containers
5. Reverse proxy Nginx ou Traefik pour gérer HTTPS et nom de domaine
6. Tests de bout en bout pour vérifier frontend ↔ backend ↔ Google Drive

### 11.3 Bénéfices

* Isolation complète des services (frontend, backend, DB)
* Facilité de déploiement et migration
* Reproductibilité sur d’autres serveurs ou cloud
* Gestion simplifiée des mises à jour via Docker Compose

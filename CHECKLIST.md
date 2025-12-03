# ✅ Checklist de Démarrage - Application Photographe

## Phase 1 : Configuration Initiale

### 🔧 Prérequis système

- [X]  Node.js 20+ installé (`node --version`)
- [X]  Docker installé (`docker --version`)
- [X]  Docker Compose installé (`docker-compose --version`)
- [X]  Git installé (optionnel)
- [ ]  PostgreSQL installé (si développement local)

### 🔑 Google Drive API (CRITIQUE)

- [ ]  Projet créé sur Google Cloud Console
- [ ]  API Google Drive activée
- [ ]  Compte de service créé
- [ ]  Fichier JSON de clés téléchargé
- [ ]  Email du compte de service copié
- [ ]  Private key extraite du JSON
- [ ]  Dossier créé dans Google Drive
- [ ]  Dossier partagé avec le compte de service (droits Éditeur)
- [ ]  ID du dossier copié (depuis l'URL)

### ⚙️ Configuration environnement

- [X]  Fichier `.env` créé à la racine : `cp .env.example .env`
- [X]  `POSTGRES_PASSWORD` configuré (mot de passe fort)
- [X]  `JWT_SECRET` configuré (clé aléatoire longue)
- [ ]  `GOOGLE_DRIVE_CLIENT_EMAIL` renseigné
- [ ]  `GOOGLE_DRIVE_PRIVATE_KEY` renseigné (avec `\n`)
- [ ]  `GOOGLE_DRIVE_FOLDER_ID` renseigné
- [X]  Fichier `.env` backend créé : `cp backend/.env.example backend/.env`
- [X]  Fichier `.env` frontend créé : `cp frontend/.env.example frontend/.env`

## Phase 2 : Démarrage (choisir une option)

### Option A : Docker (Recommandé pour production)

- [X]  `docker-compose up -d` exécuté
- [X]  Services démarrés : `docker-compose ps`
- [X]  Aucune erreur dans les logs : `docker-compose logs`
- [X]  PostgreSQL accessible sur port 5432
- [X]  Backend accessible sur http://localhost:3000
- [X]  Frontend accessible sur http://localhost:5173

### Option B : Développement local

#### Backend

- [ ]  `cd backend`
- [ ]  `npm install` exécuté
- [ ]  PostgreSQL démarré localement
- [ ]  `DATABASE_URL` configuré dans `backend/.env`
- [ ]  `npm run prisma:generate` exécuté
- [ ]  `npm run prisma:migrate` exécuté
- [ ]  `npm run start:dev` exécuté
- [ ]  Backend accessible sur http://localhost:3000

#### Frontend

- [ ]  `cd frontend`
- [ ]  `npm install` exécuté
- [ ]  `VITE_API_URL` configuré dans `frontend/.env`
- [ ]  `npm run dev` exécuté
- [ ]  Frontend accessible sur http://localhost:5173

## Phase 3 : Vérification

### 🧪 Tests de base

- [ ]  Frontend se charge sans erreur
- [ ]  Backend répond : `curl http://localhost:3000/api` ou navigateur
- [ ]  Pas d'erreurs dans la console navigateur (F12)
- [ ]  Pas d'erreurs dans les logs backend

### 🗄️ Base de données

- [ ]  Tables créées : `User`, `Album`, `Photo`
- [ ]  Prisma Studio accessible : `npm run prisma:studio` (dans backend/)
- [ ]  Connexion à la BDD réussie

### 🔐 Création utilisateur admin

- [ ]  Mot de passe hashé généré avec bcrypt
- [ ]  Utilisateur admin créé dans la table `User`
- [ ]  Email et password configurés
- [ ]  Role = "admin"

## Phase 4 : Développement

### 📝 Backend - Modules à créer

- [ ]  Module Auth (`nest g module auth`)

  - [ ]  Controller auth
  - [ ]  Service auth
  - [ ]  JWT Strategy
  - [ ]  Local Strategy
  - [ ]  Auth Guard
- [ ]  Module Albums (`nest g module albums`)

  - [ ]  Controller albums
  - [ ]  Service albums
  - [ ]  DTOs (Create, Update)
- [ ]  Module Photos (`nest g module photos`)

  - [ ]  Controller photos
  - [ ]  Service photos
  - [ ]  Upload endpoint
  - [ ]  DTOs (Create, Update)
- [ ]  Module Google Drive

  - [ ]  Service google-drive
  - [ ]  Méthodes : upload, delete, getPublicUrl
- [ ]  Module Image Processing

  - [ ]  Service image-processing
  - [ ]  Méthodes : generateThumbnail, optimizeImage
- [ ]  Module Prisma

  - [ ]  Service prisma
  - [ ]  Configuration globale

### 🎨 Frontend - Composants à créer

- [ ]  Layout (Header, Footer, Navigation)
- [ ]  Pages

  - [ ]  Home
  - [ ]  Albums List
  - [ ]  Album Detail
  - [ ]  Photo Detail
  - [ ]  Login
  - [ ]  Admin Dashboard
- [ ]  Components Albums

  - [ ]  AlbumCard
  - [ ]  AlbumList
  - [ ]  AlbumForm
- [ ]  Components Photos

  - [ ]  PhotoCard
  - [ ]  PhotoGallery
  - [ ]  PhotoDetail
  - [ ]  UploadForm
- [ ]  Services

  - [ ]  API client (Axios)
  - [ ]  Auth service
  - [ ]  Albums service
  - [ ]  Photos service
- [ ]  Stores (Zustand)

  - [ ]  Auth store
  - [ ]  Albums store

### 🔗 Intégrations

- [ ]  Routes frontend configurées (React Router)
- [ ]  Appels API frontend ↔ backend fonctionnels
- [ ]  Authentification JWT implémentée
- [ ]  Upload de fichiers frontend → backend → Google Drive
- [ ]  Optimisation d'images avec Sharp
- [ ]  URLs publiques des images générées

## Phase 5 : Tests fonctionnels

### 🧪 Scénarios à tester

- [ ]  Connexion admin réussie
- [ ]  Création d'un album
- [ ]  Modification d'un album
- [ ]  Suppression d'un album
- [ ]  Upload d'une photo
- [ ]  Photo apparaît dans Google Drive
- [ ]  Photo visible dans l'album frontend
- [ ]  Page détail photo accessible
- [ ]  Navigation prev/next entre photos
- [ ]  Suppression d'une photo
- [ ]  Photo supprimée de Google Drive
- [ ]  Responsive mobile vérifié
- [ ]  Performances acceptables (chargement < 3s)

### 🔒 Tests sécurité

- [ ]  Routes admin protégées (sans JWT = 401)
- [ ]  Validation des types MIME
- [ ]  Limite de taille de fichier respectée
- [ ]  Pas d'exposition des secrets dans le code
- [ ]  CORS configuré correctement
- [ ]  Rate limiting actif

## Phase 6 : Préparation production

### 🚀 Serveur

- [ ]  Serveur OVH commandé/configuré
- [ ]  Docker installé sur le serveur
- [ ]  Docker Compose installé sur le serveur
- [ ]  SSH configuré
- [ ]  Firewall configuré (ports 80, 443, 22)

### 🌐 Domaine

- [ ]  Nom de domaine acheté
- [ ]  DNS configuré (enregistrement A vers IP serveur)
- [ ]  Propagation DNS vérifiée

### 🔐 SSL/HTTPS

- [ ]  Certbot installé
- [ ]  Certificat Let's Encrypt généré
- [ ]  Renouvellement automatique configuré
- [ ]  HTTPS fonctionnel

### 📦 Déploiement

- [ ]  Code transféré sur le serveur (Git ou SCP)
- [ ]  `.env` production configuré (avec secrets sécurisés)
- [ ]  `docker-compose up -d` sur le serveur
- [ ]  Application accessible via le domaine
- [ ]  Migrations BDD exécutées en production

### 🔧 Post-déploiement

- [ ]  Sauvegardes automatiques configurées
- [ ]  Logs configurés et monitoring actif
- [ ]  Tests de charge effectués
- [ ]  Documentation mise à jour
- [ ]  Utilisateur admin créé en production

## ⚠️ Points critiques

### 🔴 À NE JAMAIS faire

- [ ]  ❌ Commiter les fichiers `.env`
- [ ]  ❌ Exposer les clés Google Drive côté client
- [ ]  ❌ Utiliser des secrets faibles en production
- [ ]  ❌ Désactiver HTTPS en production
- [ ]  ❌ Ignorer les erreurs d'upload
- [ ]  ❌ Oublier de valider les inputs utilisateur

### ✅ À TOUJOURS faire

- [ ]  ✓ Utiliser des variables d'environnement
- [ ]  ✓ Hasher les mots de passe (bcrypt)
- [ ]  ✓ Valider tous les uploads
- [ ]  ✓ Sauvegarder régulièrement la BDD
- [ ]  ✓ Monitorer les logs d'erreurs
- [ ]  ✓ Tester avant de déployer

## 📊 Métriques de succès MVP

- [ ]  Front-office : 3+ pages fonctionnelles
- [ ]  Admin : CRUD complet albums et photos
- [ ]  Upload : pipeline complet fonctionnel
- [ ]  Images : optimisation et stockage Google Drive OK
- [ ]  Auth : système sécurisé implémenté
- [ ]  Performance : < 3s chargement page
- [ ]  Sécurité : aucune faille critique
- [ ]  Déploiement : application en ligne avec HTTPS

## 🎯 Timeline suggéré

- **Semaine 1** : Configuration + Backend (modules Auth, Albums, Photos)
- **Semaine 2** : Frontend (pages + composants) + Intégrations
- **Semaine 3** : Tests + Corrections + Déploiement

## 📞 Aide

En cas de blocage :

1. Consultez **QUICKSTART.md** → Section "Résolution de problèmes"
2. Vérifiez les logs : `docker-compose logs -f`
3. Consultez la documentation officielle des outils
4. Vérifiez les variables d'environnement

---

**Bonne chance pour votre projet ! 🚀**

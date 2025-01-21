# Étape 1 : Construire l'application
FROM node:20-alpine AS base

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour les dépendances
COPY package.json package-lock.json* ./

# Installer les dépendances
RUN npm install --frozen-lockfile

# Copier le reste du code de l'application
COPY . .

# Désactiver ESLint pendant la compilation et construire l'application
ENV NEXT_DISABLE_ESLINT=1
RUN npm run build

# Étape 2 : Préparer l'environnement de production
FROM node:20-alpine AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers depuis l'étape précédente
COPY --from=base /app /app

# Installer uniquement les dépendances de production
RUN npm prune --production

# Exposer le port 3000 pour l'application
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["npm", "start"]

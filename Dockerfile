# Utiliser l'image Node.js officielle
FROM node:14

# Créer le répertoire de travail
WORKDIR /usr/src/app

# Copier le code source
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 8080


# Image avec Chrome + Chromedriver
FROM selenium/standalone-chrome:latest

# Installer Node.js + npm
USER root
RUN apt-get update && apt-get install -y curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Répertoire de travail
WORKDIR /usr/src/app

# Copier ton code
COPY . .

# Installer dépendances
RUN npm install

# Exposer le port de l’appli
EXPOSE 8080

# Lancer l’app puis les tests
CMD ["sh", "-c", "npm start & sleep 5 && node test_calculatrice.js"]

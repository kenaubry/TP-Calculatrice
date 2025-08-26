FROM node:14

# Installer dépendances + Chrome + Chromedriver
RUN apt-get update && apt-get install -y wget gnupg unzip \
    && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update && apt-get install -y google-chrome-stable \
    && CHROME_VERSION=$(google-chrome --version | cut -d " " -f3 | cut -d "." -f1) \
    && DRIVER_VERSION=$(curl -s "https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION") \
    && wget -O /tmp/chromedriver.zip "https://chromedriver.storage.googleapis.com/${DRIVER_VERSION}/chromedriver_linux64.zip" \
    && unzip /tmp/chromedriver.zip -d /usr/local/bin/ \
    && rm /tmp/chromedriver.zip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Créer le répertoire de travail
WORKDIR /usr/src/app

# Copier le code source
COPY . .

# Installer dépendances Node
RUN npm install

# Exposer le port de l'app
EXPOSE 8080

# Commande de démarrage par défaut (app)
CMD ["npm", "start"]

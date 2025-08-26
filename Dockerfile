FROM selenium/standalone-chrome:latest

# Installer Node.js + npm
USER root
RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Répertoire de travail
WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]

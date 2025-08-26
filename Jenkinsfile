pipeline {
    agent any

    stages {
        stage('Cloner le Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kenaubry/TP-Calculatrice.git'
            }
        }

        stage('Construire l\'Image Docker') {
            steps {
                script {
                    dockerImage = docker.build("calculatrice:${env.BUILD_ID}")
                }
            }
        }

        stage('Déployer en Environnement de Test') {
            steps {
                script {
                    bat 'docker rm -f calculatrice-test || true'
                    dockerImage.run("-d -p 8081:8080 --name calculatrice-test")
                }
            }
        }

        stage('Exécuter les Tests') {
            steps {
                script {
                    // Nettoyage préalable si besoin
                    bat 'docker rm -f selenium || true'

                    // Démarrer Selenium (Chrome headless intégré)
                    bat 'docker run -d --name selenium -p 4444:4444 selenium/standalone-chrome:latest'

                    // Attendre que Selenium soit prêt
                    bat 'ping -n 15 127.0.0.1 > nul'

                    // Installer selenium-webdriver dans le workspace
                    bat 'npm install selenium-webdriver'

                    // Lancer les tests Selenium
                    bat 'node test_calculatrice.js'

                    // Nettoyage du container Selenium
                    bat 'docker rm -f selenium || true'
                }
            }
        }

        stage('Déployer en Environnement de Production') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                input message: 'Les tests ont réussi. Voulez-vous déployer en production ?', ok: 'Déployer'
                script {
                    bat 'docker rm -f calculatrice-prod || true'
                    dockerImage.run("-d -p 8080:8080 --name calculatrice-prod")
                }
            }
        }
    }

    post {
        always {
            script {
                // Nettoyage des containers de test
                bat 'docker rm -f calculatrice-test || true'
                bat 'docker rm -f selenium || true'
            }
        }
    }
}

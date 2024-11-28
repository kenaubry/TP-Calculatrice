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
                    sh 'docker rm -f calculatrice-test || true'
                    dockerImage.run("-d -p 8081:8080 --name calculatrice-test")
                }
            }
        }

        stage('Exécuter les Tests') {
            steps {
                script {
                    sh 'sleep 5' // Attendre que le conteneur démarre
                    sh 'npm install' // Installer les dépendances pour les tests
                    sh 'npm test' // Exécuter le script de test Selenium
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
                    sh 'docker rm -f calculatrice-prod || true'
                    dockerImage.run("-d -p 8080:8080 --name calculatrice-prod")
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'docker rm -f calculatrice-test || true'
            }
        }
    }
}

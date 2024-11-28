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
                    bat 'ping -n 6 127.0.0.1 > nul' // Attendre que le conteneur démarre
                    bat 'npm install selenium-webdriver'
                    bat 'node test_calculatrice.js' 
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
                sh 'docker rm -f calculatrice-test || true'
            }
        }
    }
}

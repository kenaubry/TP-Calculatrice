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

        stage('Exécuter les Tests') {
            steps {
                script {
                    // Lancer un conteneur basé sur l'image pour exécuter les tests
                    bat "docker run --rm -p 8081:8080 calculatrice:${env.BUILD_ID} node test_calculatrice.js"
                }
            }
        }

        stage('Déployer en Production') {
            when {
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            }
            steps {
                input message: 'Les tests ont réussi. Voulez-vous déployer en production ?', ok: 'Déployer'
                script {
                    bat 'docker rm -f calculatrice-prod || true'
                    dockerImage.run("-d -p 8081:8080 --name calculatrice-prod")
                }
            }
        }
    }
}

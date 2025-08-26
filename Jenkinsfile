pipeline {
    agent any

    stages {
        stage('Cloner le Code') {
            steps {
                git branch: 'main', url: 'https://github.com/kenaubry/TP-Calculatrice.git'
            }
        }

        stage('Construire et Tester l\'Image Docker') {
            steps {
                script {
                    // Build + lancement = app + tests
                    bat "docker build -t calculatrice:${env.BUILD_ID} ."
                    bat "docker run --rm calculatrice:${env.BUILD_ID}"
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
                    bat "docker run -d -p 8081:8080 --name calculatrice-prod calculatrice:${env.BUILD_ID}"
                }
            }
        }
    }
}

pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Démarrage du build...'
            }
        }
        stage('Test') {
            steps {
                echo 'Démarrage des tests...'
                // Vérifier que le fichier index.html existe
                bat '''
                if exist index.html (
                    echo "Fichier index.html présent"
                ) else (
                    echo "Fichier index.html manquant"
                    exit /b 1
                )
                '''
            }
        }
    }
}

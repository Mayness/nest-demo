pipeline {
    agent {
        docker {
            image 'node:8.16.1-jessie' 
        }
    }
    stages {
        stage('Build') { 
            steps {
                sh '''
                    node -v
                    npm -v
                '''
            }
        }
    }
}
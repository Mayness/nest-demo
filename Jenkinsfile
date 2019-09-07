pipeline {
    agent {
        docker {
            image 'node:8.16.1-buster'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh "docker info"
                sh "node -v"
            }
        }
    }
}
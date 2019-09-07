pipeline {
    agent any
    tools {
        docker 'docker stable'
    }
    stages {
        stage('Test') {
            steps {
                sh "docker info"
            }
        }
    }
}
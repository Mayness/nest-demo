pipeline {
    agent any
    stages {
        stage('Build') { 
            script {
                docker.withTool('docker') {
                    docker.build('mayness/test')
                }
            }
        }
    }
}
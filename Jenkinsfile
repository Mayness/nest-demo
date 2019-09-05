pipeline {
    agent {
        docker {
            image 'node:6-alpine'
        }
    }
    stages {
        stage('Build') { 
            steps {
                script {
                    def app = docker.build('mayness/test');
                    app.push('latest');
                }
            }
        }
    }
}
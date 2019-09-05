pipeline {
    agent {
        docker {
            image 'node:6-alpine'
        }
    }
    stages {
        stage('Build') { 
            steps {
                def app = docker.build('mayness/test');
                app.push('latest');
            }
        }
    }
}
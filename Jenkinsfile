pipeline {
    agent any
    tools {
        docker 'docker stable'
	}
    stages {
        stage('Build') { 
            steps {
                script {
                    def app = docker.build('mayness/test');
                }
            }
        }
    }
}
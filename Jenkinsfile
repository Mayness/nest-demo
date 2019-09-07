pipeline {
    agent {
        docker {
            image 'node:8.16.1-buster' 
        }
    }
    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker stable'
    }
    stages {
        stage('Test') {
            steps {
                sh "docker info"
            }
        }
    }
}
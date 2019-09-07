pipeline {
    agent any
    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker stable'
    }
    stages {
        stage('Test') {
            steps {
                sh "docker version"
            }
        }
    }
}
pipeline {
    agent any
    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' 'docker stable'
        node 'node stable'
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
pipeline {
    agent none
    tools {
        'org.jenkinsci.plugins.docker.commons.tools.DockerTool' '18.09'
    }
    stages {
        stage('Test') {
            steps {
                sh "docker version"
            }
        }
    }
}
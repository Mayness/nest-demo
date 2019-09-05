pipeline {
    agent any
    stages {
        stage('DockerPublish') {
            steps {
                // Run the Docker tool to build the image
                script {
                    docker.withTool('docker') {
                        app = docker.build('mayness/test').inside("--volume=/var/run/docker.sock:/var/run/docker.sock")
                    }
                }
            }
        }
    }
}
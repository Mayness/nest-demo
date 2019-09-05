pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:8.16.1-buster' 
                }
            }
            steps {
                sh '''
                    node -v
                    npm -v
                    npm i   
                '''
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sh '''
                    ls
                    docker -v
                '''
            }
        }
    }
}
pipeline {
    agent none
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
                    npm run build
                '''
            }
        }
        stage('Deploy') {
            agent any
            steps {
                sh '''
                    ls
                    docker build -t registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo .
                    docker push registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo
                '''
            }
        }
    }
}
pipeline {
    agent any
    environment {
        def PackageInfo = ''
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image 'node:8.16.1-buster' 
                }
            }
            steps {
                script{
                    PackageInfo = sh(script: "npm run packageInfo | awk 'END{print}'", returnStdout: true)
                }
                sh '''
                    node -v
                    npm -v
                '''
            }
        }
        stage('Deploy') {
            options {
                skipDefaultCheckout()
            }
            steps {
                sh 'ls'
                script {
                    def ImageName = "registry.cn-hangzhou.aliyuncs.com/dmy_mirror/${PackageInfo}"
                    def Image = docker.build(ImageName)
                    Image.push()
                }
            }
        }
    }
}
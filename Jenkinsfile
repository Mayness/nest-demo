pipeline {
    agent any
    environment {
        Project = ''
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
                    Project=sh(script: "npm run packageInfo | awk 'END{print}'", returnStdout: true)
                }
                // echo "$Project"
                // sh '''
                //     // node -v
                //     // npm -v
                //     // npm i
                //     // npm run build
                // '''
            }
        }
        // stage('Deploy') {
        //     steps {
        //         sh 'ImageName="registry.cn-hangzhou.aliyuncs.com/dmy_mirror/"'+Project
        //         echo 'ImageName'
        //     }
        // }
    }
}
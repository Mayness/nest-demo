pipeline {
    agent none
    environment {
        def PackageInfo = ""
        def ImageName = ""
    }
    stages {
        stage('Build') {
            when {
                branch 'master'
            }
            agent {
                docker {
                    image "mayness/node:2"
                }
            }
            steps {
                script{
                    PackageInfo = sh(script: "npm run packageInfo | awk 'END{print}'", returnStdout: true)
                    echo "Package is building: ${PackageInfo}"
                }
                sh '''
                    cnpm -v
                    cnpm i
                    npm run build
                '''
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            agent any
            options {
                skipDefaultCheckout()
            }
            steps {
                script {
                    ImageName = "registry.cn-hangzhou.aliyuncs.com/dmy_mirror/${PackageInfo}"
                }
                sh "ls"
                sh "docker build . -t ${ImageName}"
                sh "cat ${JENKINS_HOME}/.project_config/docker | docker login -u 13438496218 --password-stdin ${ImageName}"
                sh "docker push ${ImageName}"
            }
            post { 
                success {
                    echo "SUCCESS! \n ${ImageName}"
                }
            }
        }
    }
    post {
        failure {
            echo "FAILED!"
        }
    }
}
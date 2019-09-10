pipeline {
    agent none
    environment {
        def PackageInfo = ""
        def ImageName = ""
    }
    stages {
        stage('Build') {
            agent {
                docker {
                    image "node:8.16.1-buster"
                }
            }
            steps {
                script{
                    PackageInfo = sh(script: "npm run packageInfo | awk 'END{print}'", returnStdout: true)
                    echo "Package is building: ${PackageInfo}"
                }
                sh "node -v"
                sh "npm -v"
                sh '''
                    alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"
                    cnpm i
                '''
                sh "npm run build"
                sh "ls"
            }
        }
        stage('Deploy') {
            agent any
            options {
                skipDefaultCheckout()
            }
            steps {
                script {
                    ImageName = "registry.cn-hangzhou.aliyuncs.com/dmy_mirror/${PackageInfo}"
                }
                sh "ls"
                // sh "docker build . -t ${ImageName}"
                // sh "cat ${JENKINS_HOME}/.project_config/docker | docker login -u 13438496218 --password-stdin ${ImageName}"
                // sh "docker push ${ImageName}"
            }
        }
    }
}
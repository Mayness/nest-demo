pipeline {
    agent {
        docker {
            image 'node:8.16.1-buster' 
        }
    }
    stages {
        stage('Initialize') {
            steps {
                sh '''
                    node -v
                    npm -v
                    alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                    cnpm i
                    npm run build
                '''
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker build -t registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo .
                    docker push registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo
                '''
            }
        }
    }
}
pipeline {
    agent {
        docker {
            image 'node:8.16.1-buster' 
        }
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    node -v
                    npm -v
                    alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"
                    cnpm i
                    npm run build
                    docker build -t registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo .
                    docker push registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo
                '''
            }
        }
        // stage('Deploy') {
        //     steps {
        //         sh '''
        //         '''
        //     }
        // }
    }
}
pipeline {
    agent none
    stages {
        stage('Build') {
            steps {
                sh '''
                    node -v
                    npm -v
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
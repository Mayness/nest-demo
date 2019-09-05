pipeline {
    agent none
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker build -t registry.cn-hangzhou.aliyuncs.com/dmy_mirror/nest_demo .
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
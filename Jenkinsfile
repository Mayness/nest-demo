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
                    npm run build
                    npm run packageInfo | awk 'END{print}' > .packageInfo
                '''
            }
        }
        stage('Deploy') {
            options {
                skipDefaultCheckout()
            }
            steps {
                sh '''
                    ls
                    PackageInfo=`cat .packageInfo`
                    ImageName="registry.cn-hangzhou.aliyuncs.com/dmy_mirror/$PackageInfo"
                    docker build . --tag $ImageName
                    cat "$JENKINS_HOME/.project_config/docker" | docker login -u 13438496218 --password-stdin $ImageName
                    docker push $ImageName
                '''
            }
        }
    }
}
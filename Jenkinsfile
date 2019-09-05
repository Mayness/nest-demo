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
                    echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
                        --cache=$HOME/.npm/.cache/cnpm \
                        --disturl=https://npm.taobao.org/dist \
                        --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
                    cnpm i
                '''
            }
        }
    }
}
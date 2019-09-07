pipeline {
    agent any
    stages {
        stage('Build') {
            agent {
                {
                    docker {
                        image 'node:8.16.1-buster'
                    }
                }
            }
            steps {
                sh '"
                    node -v
                    npm -v
                    alias cnpm="npm --registry=https://registry.npm.taobao.org --cache=$HOME/.npm/.cache/cnpm --disturl=https://npm.taobao.org/dist --userconfig=$HOME/.cnpmrc"
                    cnpm i
                    npm run build
                "'
            }
        }
    }
}
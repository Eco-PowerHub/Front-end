pipeline {
    agent any

    environment {
        NODEJS_HOME = '/usr/local/bin/node' 
        PATH = "${NODEJS_HOME}:${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/Eco-PowerHub/Front-end.git' 
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Build Angular App') {
            steps {
                script {
                    sh 'ng build --configuration=production'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'ng test --watch=false --browsers=ChromeHeadless'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'Build and Tests Passed Successfully!'
        }
        failure {
            echo 'Build or Tests Failed!'
        }
    }
}

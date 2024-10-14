pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'javac HelloWorld.java'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'java HelloWorld'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                // not deploying for now
            }
        }
    }

    post {
        always {
            echo 'This will always run after the stages.'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

pipeline {
    agent any
    stages {
        stage('git repo & clean') {
            steps {
               bat "rmdir  /s /q jenkinsfile"
                bat "git clone https://github.com/Yoel-samoun/test-cypress-playwrite.git"
                bat "mvn clean -f jenkinsfile"
            }
        }
        stage('install') {
            steps {
                bat "mvn install -f jenkinsfile"
            }
        }
        stage('test') {
            steps {
                bat "mvn test -f jenkinsfile"
            }
        }
        stage('package') {
            steps {
                bat "mvn package -f jenkinsfile"
            }
        }
    }
}

pipeline {
    agent any
    stages {
        stage('git repo & clean') {
            steps {
               bat "rmdir  /s /q Testcypressinjenkins"
                bat "git clone https://github.com/Yoel-samoun/test-cypress-playwrite.git"
                bat "mvn clean -f Testcypressinjenkins"
            }
        }
        stage('install') {
            steps {
                bat "mvn install -f Testcypressinjenkins"
            }
        }
         stage('Stage 1') {
                  steps {
                      echo 'Hello world!' 
                  }
              }
        stage('test') {
            steps {
                bat "mvn test -f Testcypressinjenkins"
            }
        }
        stage('package') {
            steps {
                bat "mvn package -f Testcypressinjenkins"
            }
        }
    }
}

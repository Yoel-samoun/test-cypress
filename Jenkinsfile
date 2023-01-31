pipeline {
    agent any
    stages {
        stage('git repo & clean') {
            steps {
               sh "rmdir  /s /q Testcypressinjenkins"
                sh "git clone https://github.com/Yoel-samoun/test-cypress-playwrite.git"
                sh "mvn clean -f Testcypressinjenkins"
            }
        }
        stage('install') {
            steps {
                sh "mvn install -f Testcypressinjenkins"
            }
        }
         stage('Stage 1') {
                  steps {
                      echo 'Hello world!' 
                  }
              }
        stage('test') {
            steps {
                sh "mvn test -f Testcypressinjenkins"
            }
        }
        stage('package') {
            steps {
                sh "mvn package -f Testcypressinjenkins"
            }
        }
    }
}

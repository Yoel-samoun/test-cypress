pipeline {
    agent any
    stages {
        
        stage('Stage 1') {
                  steps {
                      echo 'Enter Hello world!' 
                  }
              }
        stage('git repo & clean') {
            steps {
               //sh "rmdir  /s /q Testcypressinjenkins"
                echo 'clean Hello world!' 
                //sh "git clone https://github.com/Yoel-samoun/test-cypress-playwrite.git"
               // sh "mvn clean -f Testcypressinjenkins"
            }
        }
        
        
        stage('install') {
            steps {
               // sh "mvn install -f Testcypressinjenkins"
                 echo 'Install Hello world!' 
            }
        }
         
        stage('test') {
            steps {
                echo "$PATH"
                 // sh "npm install cypress"
                //sh "/Users/hubhip/node_modules/cypress/bin/cypress --version"
                  //sh "cypress verify 
                //✔  Verified Cypress! /Users/hubhip/Library/Caches/Cypress/12.4.1/Cypress.app"
                 // sh "/Users/hubhip/node_modules/cypress/bin/cypress run --spec \"e2e/app/test-app.cy.js\""
                //sh "mvn test -f Testcypressinjenkins"
            }
        }
        stage('package') {
            steps {
               // sh "mvn package -f Testcypressinjenkins"
                echo 'package Hello world!' 
            }
        }
    }
}

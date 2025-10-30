pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Pulling code from GitHub...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                dir('react-app') {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                echo '⚙️ Building the React app...'
                dir('react-app') {
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Build') {
            steps {
                echo '📦 Archiving build files...'
                archiveArtifacts artifacts: 'react-app/build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build completed successfully!'
        }
        failure {
            echo '❌ Build failed. Please check the logs.'
        }
    }
}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm --version'
        sh 'node --version'
        sh 'npm ci || npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Archive') {
      steps {
        archiveArtifacts artifacts: 'build/**', fingerprint: true
      }
    }
  }
  post {
    success {
      echo "Build successful!"
    }
    failure {
      echo "Build failed!"
    }
  }
}

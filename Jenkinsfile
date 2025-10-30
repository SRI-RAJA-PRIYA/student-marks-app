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

// Notes:
// - Jenkins agent must have Node installed or use a Node Docker agent.
// - archiveArtifacts will store the `build/` folder produced by `npm run build`.
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

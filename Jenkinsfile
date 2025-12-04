pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'  // Configure no Jenkins → Tools → NodeJS Installation
    }

    stages {
        stage('Instalar dependências') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Executar testes Cypress') {
            steps {
                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npm run test || true'
                }
            }
        }

        stage('Gerar relatório Mochawesome') {
            steps {
                sh 'npm run report:generate || true'
            }
        }
    }

    post {
        always {
            // Relatório HTML lindo no Jenkins
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'mochawesome-report',
                reportFiles: 'mochawesome.html',
                reportName: 'Relatório Cypress - JavaScript',
                reportTitles: 'Resultado da Execução'
            ])

            // Publica vídeos e screenshots como artefatos
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true

            cleanWs()
        }
    }
}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "cypress-jenkins",
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js'
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportPageTitle: 'Relatório Cypress - Automação',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  },

  video: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1366,
  viewportHeight: 768,
  retries: {
    runMode: 1,
    openMode: 0
  }
})
const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  video: false,
  retries: 0,
  viewportWidth: 1440,
  viewportHeight: 1080,
  expose: {
    frontendUrl: process.env.FRONTEND_BASE_URL || 'https://demoqa.com',
  },
  requestTimeout: 15000,
  responseTimeout: 30000,
  e2e: {
    baseUrl: process.env.API_BASE_URL || 'https://demoqa.com',
    specPattern: 'Features/**/*.feature',
    supportFile: false,
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
      return config;
    },
  },
});

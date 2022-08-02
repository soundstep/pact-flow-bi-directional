const { defineConfig } = require("cypress");

const pactCypressPlugin = require('@pactflow/pact-cypress-adapter/dist/plugin')
const fs = require('fs')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on('before:run', (arg1, arg2) => {
        pactCypressPlugin(on, config, fs);
      // })
    },
  },
});

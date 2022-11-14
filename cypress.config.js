const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: "https://front.serverest.dev",
    apiUrl: "https://serverest.dev",
    invalidEmail: "email@error",
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },
});

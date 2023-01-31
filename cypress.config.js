const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      

    },
  },
  env: {

    login: "Katharina_Bernier",
    mdp: "s3cret",
    url: "localhost:3000",

  }
});

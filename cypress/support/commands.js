/// <reference types="cypress" />

import credentials from "./credentials";
import hp from "./helpers"

// COMMANDS - LOGIN //
Cypress.Commands.add(
  "doLogin",
  (email, password) => {
    hp.UI.waitForTypeText("#email", email)
    hp.UI.waitForTypeText("#password", password)
    hp.UI.waitForClick("[data-testid=entrar]")
  },
);

// COMMANDS - REGISTER //
Cypress.Commands.add(
  "registerUser",
  (name, email, password, admin = "true") => {
    cy.request({
      method: "POST",
      url: Cypress.config("apiUrl") + "/usuarios",
      headers: credentials.HEADERS,
      failOnStatusCode: false,
      body: {
        nome: name,
        email: email,
        password: password,
        administrador: admin,
      },
    });
  }
);

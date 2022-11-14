/// <reference types="cypress" />

import credentials from "./credentials";

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

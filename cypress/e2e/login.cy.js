/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
const httpStatus = require("http-status-codes");

const userFaker = {
  BODY: {
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    admin: faker.datatype.boolean().toString(),
  },
};

describe("[LOGIN] E2E TESTS", () => {
  before(() => {
    cy.registerUser(
      userFaker.BODY.nome,
      userFaker.BODY.email,
      userFaker.BODY.password,
      userFaker.BODY.admin
    ).then((response) => {
      expect(response.status).to.eq(httpStatus.StatusCodes.CREATED);
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
    });
  });

  beforeEach(() => {
    cy.visit("/");
    cy.url().should("contain", "/login");
  });

  it("Login successfully", () => {
    cy.get("#email").type(userFaker.BODY.email);
    cy.get("#password").type(userFaker.BODY.password);
    cy.get("[data-testid=entrar]").click();
    cy.url().should("contain", "/home");
  });

  it("Falied login", () => {
    cy.get("#email").type(faker.internet.email());
    cy.get("#password").type(faker.internet.password());
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it("Login with email valid and password incorrect", () => {
    cy.get("#email").type(userFaker.BODY.email);
    cy.get("#password").type(faker.internet.password());
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it("Login with email incorrect and password valid", () => {
    cy.get("#email").type(faker.internet.password());
    cy.get("#password").type(userFaker.BODY.password);
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it.only("Login with invalid data", () => {
    cy.get("#email").type(Cypress.config("invalidEmail"));
    cy.get("#password").type(userFaker.BODY.password);
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it("Login with an empty email and password", () => {
    cy.get("#email").type("{backspace}");
    cy.get("#password").type("{backspace}");
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it("Login with an empty email", () => {
    cy.get("#email").type("{backspace}");
    cy.get("#password").type(userFaker.BODY.password);
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });

  it("Login with an empty password", () => {
    cy.get("#email").type(userFaker.BODY.email);
    cy.get("#password").type("{backspace}");
    cy.get("[data-testid=entrar]").click();
    cy.get('div[role="alert"]').should("be.visible");
  });
});

/// <reference types="cypress" />

import hp from "../support/helpers"
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
    cy.doLogin(userFaker.BODY.email, userFaker.BODY.password)
    cy.url().should("contain", "/home");
  });

  it("Falied login", () => {
    cy.doLogin(faker.internet.email(), faker.internet.password())
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with email valid and password incorrect", () => {
    cy.doLogin(userFaker.BODY.email, faker.internet.password())
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with email incorrect and password valid", () => {
    cy.doLogin(faker.internet.email(), faker.internet.password())
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with invalid data", () => {
    cy.doLogin(Cypress.config("invalidEmail"), userFaker.BODY.password)
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with an empty email and password", () => {
    cy.doLogin('{backspace}', '{backspace}')
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with an empty email", () => {
    cy.doLogin('{backspace}', userFaker.BODY.password)
    hp.UI.waitForElementVisible('div[role="alert"]')
  });

  it("Login with an empty password", () => {
    cy.doLogin(userFaker.BODY.email, '{backspace}')
    hp.UI.waitForElementVisible('div[role="alert"]')
  });
});

/// <reference types="cypress" />

describe("Work with login", () => {
  before(() => {
    cy.visit("https://front.serverest.dev/login");
  });

  beforeEach(() => {
    cy.reload();
    cy.get("#email").type("lucas@test.com");
    cy.get("#password").type("123456");
    cy.get("[data-testid=entrar]").click();
    cy.get("[data-testid=entrar]").should("not.exist");
    cy.get("h1")
      // cy.xpath('//h1[contains(.,`Serverest Store`)]')
      .should("contain.text", "Serverest Store");
  });

  it("Search product", () => {
    cy.get("[data-testid=pesquisar]").type("Logitech MX Vertical");
    cy.get("[data-testid=botaoPesquisar]").click();
    cy.get(".card-title").should("contain.text", "Logitech MX Vertical");
  });

  it("Search non-existent product", () => {
    cy.get("[data-testid=pesquisar]").type("non-existent product");
    cy.get("[data-testid=botaoPesquisar]").click();
    cy.get(".espacamento .col-12 > .row > .col-8").should(
      "contain.text",
      "Nenhum produto foi encontrado"
    );
  });

  it.only("add product to list", () => {
    cy.get("[data-testid=pesquisar]").type("Logitech MX Vertical");
    cy.get("[data-testid=botaoPesquisar]").click();
    cy.get(".card-title").should("contain.text", "Logitech MX Vertical");
    cy.get("[data-testid=adicionarNaLista]").click();
    cy.get("h4").should("not.exist");
  });
});

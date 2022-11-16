/// <reference types="cypress" />

// COMMANDS - HELPERS //
class Helpers {
    waitForElementVisible(element) {
      cy.get(element).should('be.visible');
    }

    waitForElementContainText(element, text) {
        cy.get(element).contains(text).should('contain.text', text);
    }

    waitForClick(element) {
        this.waitForElementVisible(element);
        cy.get(element).click();
    }

    waitForTypeText(element, text) {
        this.waitForElementVisible(element);
        cy.get(element).clear();
        cy.get(element).type(text);
    }
}

export default {
    UI: new Helpers()
};

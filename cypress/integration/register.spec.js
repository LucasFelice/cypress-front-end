/// <reference types="cypress" />


describe('Register user', () => {
    beforeEach(() =>{
    
        cy.visit('https://front.serverest.dev/login')
    })
    it('register user sucess', () => {
        

        cy.get('[data-testid=cadastrar]')
            .click()
        cy.get('#nome')
            .type('Lucas')
        cy.get('#email')
            .type('lucas@test.com')
        cy.get('#password')
            .type('123456')
        cy.get('[data-testid=cadastrar]')
            .click()
        cy.get('.alert > :nth-child(2)')
            .should('have.text', 'Cadastro realizado com sucesso')
        
    
    })
})
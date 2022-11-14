/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

const login = {
    email: faker.internet.email(),
    password: faker.internet.password()
}




describe('Work with login', () => {
    let login 

    beforeEach(() => {
       

        cy.visit('https://front.serverest.dev/login')
        cy.url().should('contain', '/login')  
    })

    it('Login success', () => {
        cy.get('#email')
            .type(login.email)
        cy.get('#password')
            .type(login.password)
        cy.get('[data-testid=entrar]')
            .click()
        cy.url().should('contain', '/home')
             
    })

    it('Login with empty email and password', () => {
        cy.get('#email')
            .type(login.email)
        cy.get('#password')
            .invoke('val', '')
        cy.get('[data-testid=entrar]')
            .click()
        // cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/form[1]/div[1]/span[1]')
        // div[role='alert']
        cy.xpath('//[.="Email é obrigatório"]')
            .should('have.text', 'Email é obrigatório')
        cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/form[1]/div[2]/span[1]')
        // cy.xpath('//*[.="Password é obrigatório"]')
            .should('have.text', 'Password é obrigatório')
    })

    it.skip('Login with empty email', () => {
        cy.get('#email')
            .invoke('val', '')
        cy.get('#password')
            .type('123456')
        cy.get('[data-testid=entrar]')
            .click()
        cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/form[1]/div[1]/span[1]')
            .should('have.text', 'Email é obrigatório')
    }) 

    it.skip('Login with empty password', () => {
        cy.get('#email')
            .type('lucas@test.com')
            cy.get('#password')
            .invoke('val', '')
        cy.get('[data-testid=entrar]')
            .click()
            cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/form[1]/div[1]/span[1]')
            .should('have.text', 'Password é obrigatório')
    }) 
    
    it.skip('Login fail', () => {
        cy.get('#email')
            .type('login@fail.com')
        cy.get('#password')
            .type('123456')
        cy.get('[data-testid=entrar]')
            .click()
        cy.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]/form[1]/div[1]/span[1]')
            .should('have.text', 'Email e/ou senha inválidos')
    })

})
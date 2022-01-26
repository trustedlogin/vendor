/// <reference types="cypress" />

context('Window', () => {
    beforeEach(() => {
      cy.visit('https://trustedlogin.ngrok.io/')
    })

    it('cy.window() - get the global window object', () => {
      // https://on.cypress.io/window
      cy.window().should('have.property', 'top')
    })

    it('Check has wp on window', () => {
      cy.window().should('have.property', 'wp');
    })
  })

/// <reference types="cypress" />
const {NGROK_WP_URL,CLIENT_WP_URL} = Cypress.env();
context('nGrok Site is Online', () => {
    beforeEach(() => {
      cy.visit(NGROK_WP_URL)
    })

    it('Check has wp on window', () => {
      cy.window().should('have.property', 'wp');
    })
  })

context('Client Site is Online', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Check has wp on window', () => {
    cy.window().should('have.property', 'wp');
  })
})

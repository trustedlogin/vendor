/// <reference types="cypress" />
const {NGROK_WP_URL,CLIENT_WP_URL} = process.env;
console.log({NGROK_WP_URL,CLIENT_WP_URL});
context('nGrok Site Online', () => {
    beforeEach(() => {
      cy.visit(NGROK_WP_URL)
    })

    it('Check has wp on window', () => {
      cy.window().should('have.property', 'wp');
    })
  })

context('client Site Online', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Check has wp on window', () => {
    cy.window().should('have.property', 'wp');
  })
})

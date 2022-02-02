/// <reference types="cypress" />
const {NGROK_WP_URL,CLIENT_WP_URL} = Cypress.env();


context('Grant access', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Login to client site', () => {
    cy.window().should('have.property', 'wp');
    cy.switchUser(CLIENT_WP_URL,{user: 'admin', password: 'password'});
  })
})

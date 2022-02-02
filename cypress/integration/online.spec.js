/// <reference types="cypress" />
const {NGROK_WP_URL,CLIENT_WP_URL,CLIENT_WP_USER,NGROK_AUTH_TOKEN} = Cypress.env();
context('nGrok Site config', () => {
    beforeEach(() => {
      cy.visit(NGROK_WP_URL)
    });

    it('Check has wp on window', () => {
      cy.window().should('have.property', 'wp');
    })

    it('Has NGROK_AUTH_TOKEN', () => {
      expect( Cypress.env('NGROK_AUTH_TOKEN')).to.be.a('string')
    });
  })

context('Client Site config', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Check has wp on window', () => {
    cy.window().should('have.property', 'wp');
  })

  it( 'Has CLIENT_WP_USER been set?', () => {
    expect( Cypress.env('CLIENT_WP_USER')).to.be.a('string')

  });
})

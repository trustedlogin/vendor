/// <reference types="cypress" />
const {NGROK_WP_URL,CLIENT_WP_URL,CLIENT_WP_PASSWORD,CLIENT_WP_USER} = Cypress.env();


context('Grant access', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Login to client site', () => {
    cy.switchUser(CLIENT_WP_URL,{user: CLIENT_WP_USER, password: CLIENT_WP_PASSWORD});
  })
})

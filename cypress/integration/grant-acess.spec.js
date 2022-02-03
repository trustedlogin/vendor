/// <reference types="cypress" />
const {
  NGROK_WP_URL,NGROK_USERS,
  CLIENT_WP_URL,CLIENT_WP_PASSWORD,CLIENT_WP_USER
} = Cypress.env();

const loginToClientSite = async () => {
  await cy.switchUser(CLIENT_WP_URL,{user: CLIENT_WP_USER, password: CLIENT_WP_PASSWORD});
  return {};
}

const loginToNgrokSite = async () => {
  await cy.switchUser(
    NGROK_WP_URL,
    {user: NGROK_USERS[0].username, password: NGROK_USERS[0].password}
  );
  return {};
}

context('Grant access', () => {
  beforeEach(() => {
    cy.visit(CLIENT_WP_URL)
  })

  it('Login to client site', async() => {
    await loginToClientSite();
  });

  it('Can grant access for login', async () => {
    await loginToClientSite();
    //@see https://docs.cypress.io/api/commands/request#Method-URL-and-Body
    cy.request('GET', `${CLIENT_WP_USER}/wp-admin`, { tle: 1 }).then(
      (response) => {
        // response.body is automatically serialized into JSON
        expect(response.body).to.have.property('accessKey');
        expect(response.body).to.have.property('error', false ) // true
        //response.body.accessKey now has access key.
        // This should be in another test, but just tl;dr:
        cy.vist(NGROK_WP_URL).then( async () => {
            await loginToNgrokSite();
            cy.visitAdmin(NGROK_WP_URL, {page: 'trustedlogin-settings'}).then(
              () => {
                //Go to access key tab and check if access key input is there.
                //enter access key
                //Submit form
                //expect to be redirected to client site
              });

        });
      }
    )

  });
})

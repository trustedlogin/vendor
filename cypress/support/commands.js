/**
 * Cypress Commands - Adds helper commands to cypress.
 *
 * https://docs.cypress.io/api/cypress-api/custom-commands
 */

//Based on https://raw.githubusercontent.com/bigbite/wp-cypress/d0e0c144431693cb2f144e5ee3a26e0ac56c094d/lib/cypress-support/commands.js


const commands = {
/**
 * Run a WP CLI command in Docker container
 * @param {string} command
 */
  wp(command) {
    command = `docker-compose run wpcli wp ${command}`
    cy.exec(command);
  },



  resetWP(version = false) {
    const wpVersion = version || (Cypress.wp || {}).version || false;
    cy.log('WP Cypress: performing full teardown...');
    //Reset with our wp.js script
    cy.exec( `node wp.js ---reset`);
    cy.exec(`node_modules/.bin/wp-cypress soft-reset ${wpVersion ? `--version='${wpVersion}'` : ''}`);
  },

  installTheme(name) {
    wp(`"theme install ${name}"`);
  },

  activateTheme(name) {
    wp(`"theme activate ${name}"`);
  },

  installPlugin(name) {
    wp(`"plugin install ${name}"`);
  },

  activatePlugin(name) {
    wp(`"plugin activate ${name}"`);
  },

  deactivatePlugin(name) {
    wp(`"plugin deactivate ${name}"`);
  },

  visitAdmin(options = {}) {
    cy.visit('/wp-admin/index.php', options);
  },

  editPost(id, options = {}) {
    cy.visit(`/wp-admin/post.php?post=${id}&action=edit`, options);
  },

  saveCurrentPost() {
    cy.window().then((win) => win.wp.data.dispatch('core/editor').savePost());
  },

  switchUser(siteUrl,{user = 'admin', password}) {


        cy.clearCookies();
        cy.visit(`${siteUrl}/wp-login.php?loggedout=true`);

        // Check if Jetpack SSO is installed, click through if so.
        cy.get('body').then((body) => {
          if (body.find('.jetpack-sso-toggle.wpcom').length > 0) {
            cy.get('.jetpack-sso-toggle.wpcom').click();
          }
        });

        cy.get('#user_login').focus().invoke('val', user);
        cy.get('#user_pass').focus().invoke('val', password);
        cy.get('#wp-submit').click();


  },

  logout() {
    wp('"wp-cypress-set-user --logout"').then(() => {
      cy.clearCookies();
      cy.visit('/wp-login.php?loggedout=true');
    });
  },
};

Object.keys(commands).forEach((command) => {
  Cypress.Commands.add(command, commands[command]);
});

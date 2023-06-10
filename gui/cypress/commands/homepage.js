Cypress.Commands.add('assertHomepage', () => {
    cy.url().should('eq', '/');
    cy.title().should('eq', 'Demo Web Shop');
});

module.exports = {
    assertHomepage: Cypress.Commands.assertHomepage
};

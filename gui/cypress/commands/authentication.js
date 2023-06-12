Cypress.Commands.add('login', (email, password, { rememberUser = false } = {}) => {
    const signinPath = 'login';
    const log = Cypress.log({
        name: 'login',
        displayName: 'LOGIN',
        message: [`🔐 Authenticating | ${email}`],
        autoEnd: false,
    });

    cy.intercept("POST", signinPath).as("loginUser");

    cy.location("pathname", { log: false }).then((currentPath) => {
        if (currentPath !== signinPath) {
            cy.visit(signinPath);
        }
    });

    log.snapshot("before");


    cy.get('#Email').type(email || "bartjan270903@gmail.com");
    cy.get('#Password').type(password || "8Gq7dVAs");

    if (rememberUser) {
        cy.get("#RememberMe").check();
    }

    cy.get('.login-button').click();
    cy.wait("@loginUser").then((loginUser) => {
        log.set({
            consoleProps() {
                return {
                    email,
                    password,
                    rememberUser,
                };
            },
        });

        log.snapshot("after");
        log.end();
    });

    log.end();
});


Cypress.Commands.add('logout', () => {
    const log = Cypress.log({
        name: 'logout',
        displayName: 'LOGOUT',
        autoEnd: false,
    });

    log.snapshot("before");

    cy.visit('logout');

    log.snapshot("after");
    log.end();
});

Cypress.Commands.add('assertLoggedin', () => {
    cy.get('.header-links .account').should('have.text', Cypress.env('webshopUsername'));
})

Cypress.Commands.add('assertLoggedout', () => {
    cy.get('.header-links').should('contain', 'Log in');
    cy.get('.header-links').should('not.contain', Cypress.env('webshopUsername'));
})


module.exports = {
    login: Cypress.Commands.login,
    logout: Cypress.Commands.logout,
    assertLoggedin: Cypress.Commands.assertLoggedin,
    assertLoggedout: Cypress.Commands.assertLoggedout
};

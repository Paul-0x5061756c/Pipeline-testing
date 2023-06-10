import 'cypress-mochawesome-reporter/register';
Cypress.Commands.add('visitShoppingCart', () => {
    const log = Cypress.log({
        name: 'shopping cart',
        displayName: 'SHOPPING CART',
        message: [`Navigating to shopping cart`],
        autoEnd: false,
    });

    cy.visit('cart');

    log.end();
});


Cypress.Commands.add('clearCart', () => {
    const cartPath = 'cart';

    // redirect to cart if not currently on the cart page
    cy.location("pathname", { log: false }).then((currentPath) => {
        if (currentPath !== cartPath) {
            cy.visit(cartPath);
        }
    });

    cy.get("body").then($body => {
        if ($body.find('input[name="removefromcart"]').length > 0) {
            cy.get('input[name="removefromcart"]').check();
            cy.get('input[name="updatecart"]').click();
        }
    });
});

Cypress.Commands.add('assertCartIsEmpty', () => {
    const cartPath = 'cart';

    // redirect to cart if not currently on the cart page
    cy.location("pathname", { log: false }).then((currentPath) => {
        if (currentPath !== cartPath) {
            cy.visit(cartPath);
        }
    });

    cy.get(".order-summary-content").should('contain', 'Your Shopping Cart is empty!')
});

Cypress.Commands.add('assertCartHasProduct', (product, quantity) => {
    const cartPath = 'cart';

    // redirect to cart if not currently on the cart page
    cy.location("pathname", { log: false }).then((currentPath) => {
        if (currentPath !== cartPath) {
            cy.visitShoppingCart();
        }
    });

    // loop through cart items
    cy.get('table.cart tr.cart-item-row')
        .each(($el, $index) => {
            cy.wrap($el)
                .find('.product-name')
                .should('have.attr', 'href')
                .then((href) => {
                    if (href === product.url) {
                        cy.wrap($el).find('.qty-input').should('have.value', quantity);
                    }
                });
        });
});

Cypress.Commands.add('validateCartPrices', () => {
    const cartPath = 'cart';

    // redirect to cart if not currently on the cart page
    cy.location("pathname", { log: false }).then((currentPath) => {
        if (currentPath !== cartPath) {
            cy.visitShoppingCart();
        }
    });

    // loop through cart items
    cy.get('table.cart tr.cart-item-row')
        .each(($el, $index) => {

            cy.wrap($el).find('.product-unit-price').invoke('text').as('productPrice');
            cy.wrap($el).find('.qty-input').invoke('val').as('productQty');

            cy.then(function () {
                cy.wrap($el).find('.product-subtotal').invoke('text').should('eq', ((+this.productPrice) * this.productQty).toFixed(2));
            });
        });
});

module.exports = {
    visitShoppingCart: Cypress.Commands.visitShoppingCart,
    clearCart: Cypress.Commands.clearCart,
    assertCartIsEmpty: Cypress.Commands.assertCartIsEmpty,
    assertCartHasProduct: Cypress.Commands.assertCartHasProduct,
    validateCartPrices: Cypress.Commands.validateCartPrices
};

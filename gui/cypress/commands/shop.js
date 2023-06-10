Cypress.Commands.add('visitCellPhonesPage', () => {
    cy.visit('cell-phones');
});

Cypress.Commands.add('interceptAddToCart', () => {
    // intercept the add to cart request
    cy.intercept({
        method: 'POST',
        url: 'addproducttocart/catalog/**',
    }).as('productAddToCart');
});

Cypress.Commands.add('clickAddToCartButtonOfProduct', (productId) => {
    // click add to cart button
    cy.get('.product-item[data-productid="'+ productId + '"] .buttons > input[type="button"]').click();

    // wait for response.status to be 200
    cy.wait('@productAddToCart').its('response.statusCode').should('equal', 200)
});

Cypress.Commands.add('addToCartButtonOfProductExits', (productId, callback) => {
    cy.get('.product-grid > .item-box').then($itemBox => {
        callback($itemBox.find('.product-item[data-productid="'+ productId + '"] .buttons > input[type="button"]').length > 0);
    });
})

module.exports = {
    visitCellPhonesPage: Cypress.Commands.visitCellPhonesPage,
    interceptAddToCart: Cypress.Commands.interceptAddToCart,
    clickAddToCartButtonOfProduct: Cypress.Commands.clickAddToCartButtonOfProduct,
    addToCartButtonOfProductExits: Cypress.Commands.addToCartButtonOfProductExits
};

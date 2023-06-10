import webshop_testdata from '../fixtures/webshop_testdata.json';


require('../commands/shopping_cart');
require('../commands/shop');
require('../commands/authentication');
require('../commands/homepage');

describe('Webshop test', () => {
  // runs before every test block
  beforeEach(() => {
    // logout
    cy.logout();

    // login
    cy.login("bartjan270903@gmail.com", "8Gq7dVAs");

    // empty cart if it has products
    cy.clearCart();
  });

  afterEach(() => {
    // empty cart if it has products
    cy.clearCart();

    // logout
    cy.logout();
  });

  it('Adds products to cart', () => {
    // intercept
    cy.interceptAddToCart();

    // loop through testdata
    webshop_testdata.product_sets.forEach(productSet => {
      let productAdded = false;

      // loop through products
      productSet.products.forEach(product => {
        if (productAdded) {
          return;
        }

        // visit category page
        cy.visit(productSet.url);

        // check if "add to cart" button exists
        cy.addToCartButtonOfProductExits(product.id, (exists) => {
          if (productAdded || !exists) {
            // not existing, then try next product in list
            return;
         }

          // add 'x' times to cart
          const count = Cypress._.random(2, 10);
          Cypress._.times(count, () => {
            cy.clickAddToCartButtonOfProduct(product.id);
          });

          // assert that item is added 'x' times to cart
          cy.assertCartHasProduct(product, count);

          productAdded = true;
        });
      });
    });

    cy.validateCartPrices();
  });
})

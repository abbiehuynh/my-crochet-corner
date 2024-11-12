// login function
Cypress.Commands.add('login', (username, password) => { 
    cy.visit('/login');
    cy.get('[data-test="login-username"]').type('kingliver'); 
    cy.get('[data-test="login-password"]').type('cats');
    cy.get('[data-test="login-btn"]').click();
    cy.url().should('include', '/home');
 })
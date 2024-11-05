// testing suite for logout component

describe('Logout Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
        // visits profile page where the logout button is present
        cy.contains('Profile').click();
        cy.url().should('include', '/profile');
        cy.get('[data-test="profile-page"]').should('be.visible');
    });

    it('logs out the user and redirects to login', () => {
        // Ensure the page is loaded correctly
        cy.url().should('include', '/profile');

        // renders the logout button
        cy.get('[data-test="logout-btn-profile"]').should('be.visible');
        cy.get('[data-test="logout-btn-profile"]').click();

        cy.url().should('include', '/login');
    })

});
// testing suite for navbar component

describe('Navigation Bar', () => {
    beforeEach(() => {
      // login using custom command found in /support/commands.js
      cy.login('kingliver', 'cats');
    });
  
    // tests navbar component renders on home page
  
    it('loads navigation bar', () => {
      cy.get('[data-test="navbar"]').contains('My Crochet Corner')
      cy.contains('Home');
      cy.contains('Favorites');
      cy.contains('Profile');
    })
  
    // tests links on navigation bar navigate to correct url
  
    it('clicking "Favorites" navigates to correct url', () => {
      cy.contains('Favorites').click();
      cy.url().should('include', '/favorites');
    })
  
    it('clicking "Profile" navigates to correct url', () => {
      cy.contains('Profile').click();
      cy.url().should('include', '/profile');
    })
    
    it('clicking "Home" navigates to correct url', () => {
        cy.contains('Home').click();
        cy.url().should('include', '/home');
    })
  });
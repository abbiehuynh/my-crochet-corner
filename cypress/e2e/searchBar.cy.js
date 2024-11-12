// testing suite for search bar component - testing functionality 

describe('Search Bar Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
      });

      it('renders the search bar', () => {
        cy.get('[data-test="search-bar-container"]').should('be.visible');
        cy.get('[data-test="search-bar-input"]').should('be.visible');
      })

      it('allows user to type in search bar', () => {
        const searchProject = 'Silly Goose';
       
        // assigns search input element to an alias - recieved error that required less chaining
        cy.get('[data-test="search-bar-input"]').as('searchInput');
        // types project name into input
        cy.get('@searchInput').type(searchProject);
        // requery the element to check it's still attached to the DOM
        cy.get('@searchInput').should('have.value', searchProject);
      });

      it('displays the project after searching', () => {
       const searchProject = 'Silly Goose';

       cy.get('[data-test="search-bar-input"]').type(searchProject);
       cy.wait(500); // waits for the project list to update

       // checks the project card appears and for the specific project card
       cy.get('[data-test="project-list"]').should('be.visible');
       cy.get('[data-test^=project-card-]').should('have.length.greaterThan', 0);
      })

      it('shows no results message if project is not found', () => {
        const searchProject = 'Nonexistent Project';

        cy.get('[data-test="search-bar-input"]').type(searchProject);
        cy.wait(500);

        // checks for the "no projects found" message
        cy.get('[data-test="no-projects-msg"]').should('be.visible');
      });
});
// testing suite for home page component

describe('The Home Page - renders components', () => {
  beforeEach(() => {
    // login using custom command found in /support/commands.js
    cy.login('kingliver', 'cats');
  });

  it('loads home page with correct url', () => {
    cy.url().should('include', '/home');
  });

  // tests all components render on home page

  it('renders the search bar', () => {
    cy.get('[data-test="search-bar-container"]').should('be.visible');
    cy.get('[data-test="search-bar-input"]').should('be.visible');
  });

  it('renders filter header and buttons', () => {
    cy.get('[data-test="filter-header"]').should('be.visible');
    cy.get('[data-test="filter-all"]').should('be.visible');
    cy.get('[data-test="filter-todo"]').should('be.visible');
    cy.get('[data-test="filter-inprogress"]').should('be.visible');
    cy.get('[data-test="filter-completed"]').should('be.visible');
  });

  it('renders sort header and buttons', () => {
    cy.get('[data-test="sort-header"]').should('be.visible');
    cy.get('[data-test="sort-name"]').should('be.visible');
    cy.get('[data-test="sort-type"]').should('be.visible');
    cy.get('[data-test="sort-date"]').should('be.visible');
  });

});
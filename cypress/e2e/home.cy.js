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

  it.only('renders project list header', () => {
    cy.get('[data-test="project-header"]').should('be.visible');
  })

  it.only('renders the list of projects', () => {
    cy.get('[data-test="project-list"]').should('be.visible');
    // checks that the project cards render
    cy.get('[data-test^="project-card-"]').should('have.length.greaterThan', 0);
  });

  it.only('renders the buttons for each project card', () => {
    cy.get('[data-test^="project-card-"]').each(($card) => {
      // checks for buttons on project card
      cy.wrap($card).find('[data-test="favorite-btn"]').should('be.visible');
      cy.wrap($card).find('[data-test="open-project-btn"]').should('be.visible');
      cy.wrap($card).find('[data-test="delete-btn"]').should('be.visible');
    })
  })

});
// testing suite for add project modal component

describe('Add Project Modal Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
    });

    it('renders add project button', () => {
        cy.get('[data-test="add-project-btn"]').should('be.visible')
          .and('contain', 'Add Project');
      });

    it('renders the Add Project modal when the button is clicked', () => {
        cy.get('[data-test="add-project-btn"]').click();
        cy.get('[data-test="add-project-modal"]').should('be.visible');
    });

    it('adds a new project', () => {
        const projectName = 'New Project';
        // opens add project modal
        cy.get('[data-test="add-project-btn"]').click();
        // checks the modal is visible
        cy.get('[data-test="add-project-modal"]').should('be.visible');
        // types the project name into the input
        cy.get('[data-test="add-project-name-input"]')
            .type(projectName)
            .should('have.value', projectName);
        // submits the form
        cy.get('[data-test="add-project-form"]').submit();
        // verifies that the confirmation model appears and is correct
        cy.get('[data-test="confirmation-modal"]').should('be.visible');
        cy.get('[data-test="confirmation-modal"]').contains(`Project "${projectName}" has been added successfully!`);

        // // if the user clicks home
        // // closes the confirmation modal to go to home
        // cy.get('[data-test="home-btn-confirmation-modal"]').click();
        // // checks that the user is redirected to the home page
        // cy.url().should('include', '/home');
        // // checks if the project is displayed in the project list
        // cy.get('[data-test="project-list"]').contains(projectName).should('exist');
        
        // if the user clicks edit project
        // closes the confirmation modal to go to project details page
        cy.get('[data-test="edit-project-btn-confirmation-modal"]').click();
        // checks that the user is redirected to the project details page
        cy.url().should('include', `/user/4/project/`);
        // extract the project id dynamically
        cy.url().then(url => {
            const projectId = url.split('/').pop();
            cy.wrap(projectId).as('projectId');
        });
        // checks that the project name is visible on project details page
        cy.get('[data-test="project-name-project-page"]').should('contain', projectName);
    })
});
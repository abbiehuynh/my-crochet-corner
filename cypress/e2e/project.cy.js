// testing suite for project details page
// testing rendering and functionality of edit button

import project from '../fixtures/project.json';

describe('Project Details Page', () => {
    // declares variable to hold data within scope
    let projectData;

    beforeEach(() => {
        // loads the fixture file - project - to mock the api response
        cy.fixture('project').then((data) => {
            projectData = data[0];
            cy.intercept('GET', `/user/${projectData.user_id}/project/*`, projectData).as('getProjectDetails');
        });
        // log in usin custom command found in /support/commands.js
        cy.login('kingliver', 'cats');

        //navigates to the project details page
        cy.get('[data-test^="project-card-"]').first().then(($card) => {
            // retrieves the project ID from the fixture
            const projectId = projectData.project_id;
            // project id must have a number, cannot be undefined
            expect(projectId).to.not.be.undefined;
            // simulates clicking the button to open the project page
            cy.wrap($card).find('[data-test="open-project-btn"]').click();
            cy.wait('@getProjectDetails');
            // verifies the url contains the correct project ID and user Id
            cy.url().should('include', `user/${projectData.user_id}/project/${project.project_id}`);
        });
    })

    it('renders the project details page with the correct project data', () => {
        // verifies the project name is displayed
        cy.get('[data-test="project-name-project-page"]').should('contain', projectData.project_name);
        
        // verifies project details
        cy.get('[data-test="project-favorite-detail"]').should('contain', projectData.is_favorite);
        cy.get('[data-test="project-status"]').should('contain', projectData.project_status);
        cy.get('[data-test="project-type-detail"]').should('contain', projectData.project_type);
        cy.get('[data-test="project-created-at"]').should('contain', new Date(projectData.created_at).toLocaleDateString());
        cy.get('[data-test="project-completion-date"]').should('contain', 'Not completed');
        cy.get('[data-test="project-time-to-complete"]').should('contain', 'N/A'); // since time_to_complete is null
        cy.get('[data-test="project-notes"]').should('contain', 'N/A'); // since notes is null
        
        // verifies patterns section
        cy.get('[data-test="patterns-section"]').should('contain', projectData.patterns[0].pattern_name);
        cy.get('[data-test="patterns-section"]').should('contain', projectData.patterns[0].pattern_by || '');
        cy.get('[data-test="patterns-section"]').should('contain', projectData.patterns[0].pattern_url || '');

        // verifies other materials section
        cy.get('[data-test="other-materials-section"]').should('contain', projectData.otherMaterials[0].project_hook_size);
        cy.get('[data-test="other-materials-section"]').should('contain', projectData.otherMaterials[0].safety_eyes);
        cy.get('[data-test="other-materials-section"]').should('contain', projectData.otherMaterials[0].stuffing);
 
        //verifies yarn section
        cy.get('[data-test="yarn-section"]').should('contain', projectData.yarns[0].yarn_brand);
        cy.get('[data-test="yarn-section"]').should('contain', projectData.yarns[0].yarn_color);
        cy.get('[data-test="yarn-section"]').should('contain', projectData.yarns[0].yarn_weight);
        cy.get('[data-test="yarn-section"]').should('contain', projectData.yarns[0].yarn_type);
    
        // Verifies user and updated_at
        cy.get('[data-test="project-user"]').should('contain', projectData.user_name);
        cy.get('[data-test="project-updated-at"]').should('contain', new Date(projectData.updated_at).toLocaleString());
    });

    it('renders the edit button and toggles between editing and view mode', () => {
        // verifies the edit button is present and clicks it
        cy.get('[data-test="edit-btn"]').should('be.visible');
        cy.get('[data-test="edit-btn"]').click();
        // verifies that the form appears
        cy.get('[data-test="project-form"]').should('be.visible');
        // clicks "cancel" to exit the editing mode
        cy.get('[data-test="edit-btn"]').click();
        // verifies that the page is back in viewing mode
        cy.get('[data-test="project-details-view"]').should('be.visible');
    });
});
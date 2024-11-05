// testing suite for project details page
// testing rendering and functionality of edit and update project details
// added it.only to line 

describe('Project Details Page', () => {
    const project = {
        project_name: 'Cat Loaf',
        is_favorite: false,
        project_status: 'To Do',
        project_type: 'Amigurimi',
        created_at: '2024-11-04T22:21:43.473Z',
        end_at: null,
        time_to_complete: null,
        notes: null,
        patterns: [
            { pattern_name: 'loaf cat', pattern_by: '', pattern_url: '' }
        ],
        otherMaterials: [
            { project_hook_size: '5mm', safety_eyes: '10mm', stuffing: '50 grams' }
        ],
        yarns: [
            { yarn_brand: 'Loops and Threads Soft Classic', yarn_color: 'White', yarn_weight: '6', yarn_type: 'Chenille' }
        ],
        user_name: 'Oliver',
        updated_at: '2024-11-05T01:45:26.598Z'
    };
    
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
        // navigates to the project details page directly
        cy.get('[data-test^="project-card-"]').first().then($card => {
            // retrieves project Id
            const projectId = $card.data('project-id');
            // project Id must have a number, not undefined
            expect(projectId).to.not.be.undefined;
            // simulates the clicking the open project button
            cy.wrap($card).find('[data-test="open-project-btn"]').click();
            // verifites the url is correct
            cy.url().should('include', `/user/4/project/${projectId}`); // update userId according to login 
        })
    });

    it('renders the project details page with the correct project data', () => {
        // verifies the project name is displayed
        cy.get('[data-test="project-name-project-page"]').should('contain', project.project_name);
  
        // verifies project details
        cy.get('[data-test="project-favorite-detail"]').should('contain', project.is_favorite);
        cy.get('[data-test="project-status"]').should('contain', project.project_status);
        cy.get('[data-test="project-type-detail"]').should('contain', project.project_type);
        cy.get('[data-test="project-created-at"]').should('contain', new Date(project.created_at).toLocaleDateString());
        cy.get('[data-test="project-completion-date"]').should('contain', 'Not completed');
        cy.get('[data-test="project-time-to-complete"]').should('contain', 'N/A'); // since time_to_complete is null
        cy.get('[data-test="project-notes"]').should('contain', 'N/A'); // since notes is null

        // verifies patterns section
        cy.get('[data-test="patterns-section"]').should('contain', project.patterns[0].pattern_name);
        cy.get('[data-test="patterns-section"]').should('contain', project.patterns[0].pattern_by || '');
        cy.get('[data-test="patterns-section"]').should('contain', project.patterns[0].pattern_url || '');

        // verifies other materials section
        cy.get('[data-test="other-materials-section"]').should('contain', project.otherMaterials[0].project_hook_size);
        cy.get('[data-test="other-materials-section"]').should('contain', project.otherMaterials[0].safety_eyes);
        cy.get('[data-test="other-materials-section"]').should('contain', project.otherMaterials[0].stuffing);
 
        //verifies yarn section
        cy.get('[data-test="yarn-section"]').should('contain', project.yarns[0].yarn_brand);
        cy.get('[data-test="yarn-section"]').should('contain', project.yarns[0].yarn_color);
        cy.get('[data-test="yarn-section"]').should('contain', project.yarns[0].yarn_weight);
        cy.get('[data-test="yarn-section"]').should('contain', project.yarns[0].yarn_type);
    
        // Verifies user and updated_at
        cy.get('[data-test="project-user"]').should('contain', project.user_name);
        cy.get('[data-test="project-updated-at"]').should('contain', new Date(project.updated_at).toLocaleString());
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


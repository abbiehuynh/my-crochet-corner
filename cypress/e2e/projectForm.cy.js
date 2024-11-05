// testing suite for project form
// testing rendering and functionality of edit button
// added it.only to line 

describe('Project Details Form', () => {
    const project = {
        project_name: 'Cat Loaf',
        is_favorite: false,
        project_status: 'To Do',
        project_type: 'Amigurimi',
        created_at: '2024-11-04T22:21:43.473Z',
        end_at: null,
        time_to_complete: null,
        notes: 'calico cat',
        patterns: [
            { pattern_name: 'loaf cat', pattern_by: 'amy', pattern_url: 'ig post' }
        ],
        otherMaterials: [
            { project_hook_size: '5mm', safety_eyes: '10mm', stuffing: '50 grams' }
        ],
        yarns: [
            { yarn_brand: 'Loops and Threads Soft Classic', yarn_color: 'Orange', yarn_weight: '6', yarn_type: 'Chenille' }
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
            // verifies the edit button is present and clicks it
            cy.get('[data-test="edit-btn"]').should('be.visible');
            cy.get('[data-test="edit-btn"]').click();
        })
    });

    it('renders the project details form with correct input fields', () => {
        // check if the form is visible
        cy.get('[data-test="project-form"]').should('be.visible');

        // check if the input fields are present for each section
        cy.get('[data-test="project-name-input"]').should('exist');
        cy.get('[data-test="project-status-input"]').should('exist');
        cy.get('[data-test="project-type-input"]').should('exist');
        cy.get('[data-test="notes-input"]').should('exist');
        cy.get('[data-test="patterns-section"]').should('exist');
        cy.get('[data-test="other-materials-section"]').should('exist');
        cy.get('[data-test="yarn-section"]').should('exist');
    }); 

    it('should allow user to type in the project name input', () => {
        cy.get('[data-test="project-name-input"]').type('f').should('have.value', 'Cat Loaff');
    });

    it('should allow user to update project status', () => {
        cy.get('[data-test="project-status-input"]').clear().type('In Progress').should('have.value', 'In Progress');
        cy.get('[data-test="update-project-btn"]').click();
    });

    it('should allow user to add new patterns', () => {
        cy.get('[data-test="add-pattern-btn"]').click();  // Assuming there’s a button to add new patterns
        cy.get('[data-test="formPatternName0"]').eq(1).type('New Pattern');
        cy.get('[data-test="formPatternBy0"]').eq(1).type('Designer');
        cy.get('[data-test="formPatternUrl0"]').eq(1).type('instagram link');

        cy.get('[data-test="formPatternName0"]').eq(1).should('have.value', 'New Pattern');
        cy.get('[data-test="formPatternBy0"]').eq(1).should('have.value', 'Designer');
        cy.get('[data-test="formPatternUrl0"]').eq(1).should('have.value', 'instagram link');
    });

    it('should allow user to remove a pattern', () => {
        cy.get('[data-test="remove-pattern-btn0"]').click();
        cy.get('[data-test="formPatternName0"]').should('not.exist');
    });

    it('should submit the form and show confirmation', () => {
        // fill in the form with mock data
        cy.get('[data-test="project-name-input"]').clear().type(project.project_name);
        cy.get('[data-test="project-status-input"]').clear().type(project.project_status);
        cy.get('[data-test="project-type-input"]').clear().type(project.project_type);
        cy.get('[data-test="notes-input"]').clear().type(project.notes);

        // check if the patterns are added correctly 
        project.patterns.forEach((pattern, index) => {
            cy.get('[data-test="add-pattern-btn"]').click();
            cy.get(`[data-test="formPatternName${index}"]`).eq(0).type(pattern.pattern_name);
            cy.get(`[data-test="formPatternBy${index}"]`).eq(0).type(pattern.pattern_by);
            cy.get(`[data-test="formPatternUrl${index}"]`).eq(0).type(pattern.pattern_url);
        })

        // check if materials and yarns are filled correctly
        cy.get('[data-test="add-other-material-btn"]').click();
        cy.get('[data-test="formOtherMaterialsHookSize0"]').eq(1).type(project.otherMaterials[0].project_hook_size);
        cy.get('[data-test="formOtherMaterialsSafetyEyes0"]').eq(1).type(project.otherMaterials[0].safety_eyes);
        cy.get('[data-test="formOtherMaterialsStuffing0"]').eq(1).type(project.otherMaterials[0].stuffing);

        cy.get('[data-test="add-yarn-btn"]').click();
        cy.get('[data-test="formYarnBrand0"]').eq(1).type(project.yarns[0].yarn_brand);
        cy.get('[data-test="formYarnColor0"]').eq(1).type(project.yarns[0].yarn_color);
        cy.get('[data-test="formYarnWeight0"]').eq(1).type(project.yarns[0].yarn_weight);
        cy.get('[data-test="formYarnType0"]').eq(1).type(project.yarns[0].yarn_type);

        // Submit the form
        cy.get('[data-test="project-form"]').submit();
    });
});
// testing suite for project card component 
// testing functionality of favorite, open project, and delete button
// added it.only to line 11, to prevent accidentally deleting projects

describe('Favorite Button Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
    });

    it.only('renders the favorite button and hidden span', () => {
        cy.get('[data-test^="project-card-"]').each(($card) => {
            cy.wrap($card).find('[data-test="favorite-btn"]').should('be.visible');
        });

        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"]')
            .should('contain.text', 'Click to favorite project');
    });

    it('handles favorite button toggle', () => {
        // finds first project card and checks its in an unfavorited state inititally 
        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"] svg')
            .should('have.attr', 'data-icon', 'heart');
        // finds first project card and clicks favorite button
        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"]').click();
        // checks if favorite icon is red
        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"] svg')
            // .should('have.attr', 'style').and('include', 'color: red');
            .should('have.attr', 'data-icon', 'favorite-heart');

        // finds first project card and clicks favorite button again - unfavorite
        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"]').click();
        // checks if favorite icon is unfavorited
        cy.get('[data-test^="project-card-"]').first().find('[data-test="favorite-btn"] svg')
            .should('have.attr', 'data-icon', 'heart');
    });
});

describe('Open Project Link', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
    });

    it('renders the open project button', () => {
        cy.get('[data-test^="project-card-"]').each(($card) => {
            cy.wrap($card).find('[data-test="open-project-btn"]').should('be.visible');
        });
    });

    it('navigates to the project detail page when the open project button is clicked', () => {
        cy.get('[data-test^="project-card-"]').first().then($card => {
            // retrieves project Id
            const projectId = $card.data('project-id');
            // checks project Id must have a number, not undefined
            expect(projectId).to.not.be.undefined;
            // clicking the open project button
            cy.wrap($card).find('[data-test="open-project-btn"]').click();
            // grabs user Id from url
            cy.url().then((url) => {
                const userId = url.split('/')[4];
                // proceeds if userId is found
                expect(userId).to.not.be.null;
                // verifites the url is correct
                cy.url().should('include', `/user/${userId}/project/${projectId}`); // update userId according to login 
            })
        })
    });
});

describe('Delete Button Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
    });

    it('renders the delete button', () => {
        cy.get('[data-test^="project-card-"]').each(($card) => {
            cy.wrap($card).find('[data-test="delete-btn"]').should('be.visible');
        });
    });

    it('handles delete button functionality', () => {
        // find all project cards and store their initial length 
        cy.get('[data-test^="project-card-"]').then((projectCards) => {
            const initialLength = projectCards.length;
            // grab the project ID from the first project card
            cy.get('[data-test^="project-card-"]').first().invoke('attr', 'data-test').then((projectId) => {
                const projectID = projectId.split('-')[2];
                // finds first project card and clicks delete button
                cy.get('[data-test^="project-card-"]').first().find('[data-test="delete-btn"]').click();
                // automatically confirm any confirmation dialog
                cy.on('window:confirm', () => true);
                // verifies that the number of project cards decreased by 1
                cy.get('[data-test^="project-card-"]').should('have.length', initialLength - 1);
                // check that the deleted project ID is no longer in the project list
                cy.get('[data-test^="project-card-"]').each(($card) => {
                    cy.wrap($card).invoke('attr', 'data-test').should('not.contain', `project-card-${projectID}`);
                });
            });
        });
    });
});
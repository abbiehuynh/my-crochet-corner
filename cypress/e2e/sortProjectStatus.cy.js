// testing suite for filter and sort buttons 

describe('Filter Buttons Functionality', () => {
    beforeEach(() => {
        // login using custom command found in /support/commands.js
        cy.login('kingliver', 'cats');
      });

      // tests rendering of elements
      it('renders filter header and buttons', () => {
        cy.get('[data-test="filter-header"]').should('be.visible');
        cy.get('[data-test="filter-all"]').should('be.visible');
        cy.get('[data-test="filter-todo"]').should('be.visible');
        cy.get('[data-test="filter-inprogress"]').should('be.visible');
        cy.get('[data-test="filter-completed"]').should('be.visible');
      });

      // checks that only projects with "status" are displayed when clicked to filter

      it('filters projects when "All" is clicked', () => {
        cy.get('[data-test="filter-all"]').click();
        cy.get('[data-test="project-list"]').should('be.visible');
      })

      it('filters projects when "To Do" is clicked', () => {
        cy.get('[data-test="filter-todo"]').click();
        cy.get('[data-test="project-list"]').should('contain', 'To Do');
      })

      it('filters projects when "In Progress" is clicked', () => {
        cy.get('[data-test="filter-inprogress"]').click();
        cy.get('[data-test="project-list"]').should('contain', 'In Progress');
      })

      it('filters projects when "Completed" is clicked', () => {
        cy.get('[data-test="filter-completed"]').click();
        cy.get('[data-test="project-list"]').should('contain', 'Completed');
      })
});

describe('Sort Buttons Functionality', () => {
    beforeEach(() => {
        cy.login('kingliver', 'cats');
      });

      // tests rendering of elements
      it('renders sort header and buttons', () => {
        cy.get('[data-test="sort-header"]').should('be.visible');
        cy.get('[data-test="sort-name"]').should('be.visible');
        cy.get('[data-test="sort-type"]').should('be.visible');
        cy.get('[data-test="sort-date"]').should('be.visible');
      });

      // checks that only projects with "criteria" are displayed when clicked to filter

      it('sorts projects when "Name" is clicked', () => {
        cy.get('[data-test="sort-name"]').click();
        // retrives all project cards ( ^= selects all attributes regardless of id)
        cy.get('[data-test^="project-card-"]').then($projects => {
            // extracts the project names into an array
            const projectNames = $projects.map((index, project) => {
                return Cypress.$(project).find('[data-test="project-name"]').text();
            }).get();
            // creates a sorted copy of array of project names
            const sortedNames = [...projectNames].sort();
            // checks that the original array matches the sorted array
            expect(projectNames).to.deep.equal(sortedNames);
        })
      })

      it('sorts projects when "Type" is clicked', () => {
        cy.get('[data-test="sort-type"]').click();
        cy.get('[data-test^="project-card-"]').then($projects => {
            const projectTypes = $projects.map((index, project) => {
                return Cypress.$(project).find('[data-test="project-type"]').text();
            }).get();
            // creates a sorted copy of array of project types
            const sortedTypes = [...projectTypes].sort();
            expect(projectTypes).to.deep.equal(sortedTypes);
        })
      })

      it('sorts projects when "Date" is clicked', () => {
        cy.get('[data-test="sort-date"]').click();
        cy.get('[data-test^="project-card-"]').then($projects => {
            const projectDates = $projects.map((index, project) => {
                return Cypress.$(project).find('[data-test="project-date"]').text();
            }).get();
            // converts dates to a sortable format
            const sortableDates = projectDates.map(date => new Date(date).getTime());
            // creates a sorted copy of array of project dates
            const sortedDates = [...sortableDates].sort((a, b) => b - a);
            expect(sortableDates).to.deep.equal(sortedDates);
        })
      })
});
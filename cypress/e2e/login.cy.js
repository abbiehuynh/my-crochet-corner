// testing suite for login component

// tests rendering of components on Login Page
describe('Login Page - renders components', () => {
  it('loads login page', () => {
    cy.visit('/login');
  })

  it('the h2 contains the correct text', () => {
    cy.visit('login');
    cy.get('[data-test="login-header"]')
      .should("exist")
      .contains('Login');
  })

  it('checks username input', () => {
    cy.visit('/login');

    // gets username input, types 'kingliver' into it
    cy.get('[data-test="login-username"]').type('kingliver');

    // verifies that the value has been updated
    cy.get('[data-test="login-username"]').should('have.value', 'kingliver');
  })

  it('checks password input', () => {
    cy.visit('/login');

    cy.get('[data-test="login-password"]').type('cats');
    cy.get('[data-test="login-password"]').should('have.value', 'cats');
  })
});

// tests Login Action
describe('Login Page - user login', () => {
  it('successfully log in with valid credentials', () => {
    cy.visit('/login');

    // insert valid username and password
    cy.get('[data-test="login-username"]').type('kingliver'); 
    cy.get('[data-test="login-password"]').type('cats');

    // clicks the login button
    cy.get('[data-test="login-btn"]').click();

    // checks that the user is redirected to the home page
    cy.url().should('include', '/home');
    // checks that 'Your Projects' header is shown on home page
    cy.contains('Your Projects').should('be.visible');
  });

  it('shows an error message with invalid credentials', () => {
    cy.visit('/login');

    // insert invalid username and password and click button
    cy.get('[data-test="login-username"]').type('kingliverr'); 
    cy.get('[data-test="login-password"]').type('cats');
    cy.get('[data-test="login-btn"]').click();

    // checks that error message is displayed
    cy.contains('Invalid username or password').should('be.visible');
  })

});

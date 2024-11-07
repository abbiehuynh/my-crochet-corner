// testing suite for register component

// user register
describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('renders register page', () => {
    cy.visit('/register')
  });

  it('navigates to register page from "Create Account" button and renders form', () => {
    // checks the create account button render and clicks the button
    cy.get('[data-test="register-btn"').should('be.visible');
    cy.get('[data-test="register-btn"').click();

    // verifies that the user is redirected to the register page
    cy.url().should('include', '/register');

    // verifies that elements specific to the register page render
    cy.get('[data-test="register-header"]').should('be.visible');
    cy.get('[data-test="register-username-input"]').should('be.visible');
    cy.get('[data-test="register-email-input"]').should('be.visible');
    cy.get('[data-test="register-password-input"]').should('be.visible');
  });

  it('shows an error if the password is too short', () => {
    const invalidData = {
      name: 'Cappy',
      username: 'Captainbara',
      email: 'capytainbara@capybara.com',
      password: 'capy'
    };

    // checks the create account button render and clicks the button
    cy.get('[data-test="register-btn"').should('be.visible');
    cy.get('[data-test="register-btn"').click();

    // inputs invaildData
    cy.get('[data-test="register-name-input"]').type(invalidData.name);
    cy.get('[data-test="register-username-input"]').type(invalidData.username);
    cy.get('[data-test="register-email-input"]').type(invalidData.email);
    cy.get('[data-test="register-password-input"]').type(invalidData.password);

    // clicks submit without filling out form
    cy.get('[data-test="register-submit-btn"]').click();

    // checks for password error
    const passwordError = 'Password must be at least 8 characters long.'
    cy.get('[data-test="register-password-error"]').should('contain', passwordError);
  });

  it('shows an error if the username aleady exists', () => {
    // checks the create account button render and clicks the button
    cy.get('[data-test="register-btn"').should('be.visible');
    cy.get('[data-test="register-btn"').click();

    // verifies that the user is redirected to the register page
    cy.url().should('include', '/register');
    
    const existingUserData = {
      name: 'Midnight',
      username: 'sweetnight',
      email: 'midnight@gmail.com',
      password: 'coolcats'
    };
    // inputs existing user data
    cy.get('[data-test="register-name-input"]').type(existingUserData.name);
    cy.get('[data-test="register-username-input"]').type(existingUserData.username);
    cy.get('[data-test="register-email-input"]').type(existingUserData.email);
    cy.get('[data-test="register-password-input"]').type(existingUserData.password);
    // clicks submit
    cy.get('[data-test="register-submit-btn"]').click();
    // checks for specific error for username
    cy.get('[data-test="register-username-error"]').should('contain', 'This username is already taken.');
  })

  it('shows an error if the email aleady exists', () => {
    // checks the create account button render and clicks the button
    cy.get('[data-test="register-btn"').should('be.visible');
    cy.get('[data-test="register-btn"').click();

    // verifies that the user is redirected to the register page
    cy.url().should('include', '/register');
    
    const existingUserData = {
      name: 'Midnight',
      username: 'sweetnighttt',
      email: 'midnight@gmail.com',
      password: 'coolcats'
    };
    // inputs existing user data
    cy.get('[data-test="register-name-input"]').type(existingUserData.name);
    cy.get('[data-test="register-username-input"]').type(existingUserData.username);
    cy.get('[data-test="register-email-input"]').type(existingUserData.email);
    cy.get('[data-test="register-password-input"]').type(existingUserData.password);
    // clicks submit
    cy.get('[data-test="register-submit-btn"]').click();
    // checks for specific error for email
    cy.get('[data-test="register-email-error"]').should('contain', 'This email is already registered.');
  })

  it('submits the form with valid inputs creates a new account', () => {
    // checks the create account button render and clicks the button
    cy.get('[data-test="register-btn"').should('be.visible');
    cy.get('[data-test="register-btn"').click();

    // verifies that the user is redirected to the register page
    cy.url().should('include', '/register');
    
    const user = {
      name: 'Cappy',
      username: 'Captainbara',
      email: 'capytainbara@capybara.com',
      password: 'capybara'
    };
    // inputs mock data
    cy.get('[data-test="register-name-input"]').type(user.name);
    cy.get('[data-test="register-username-input"]').type(user.username);
    cy.get('[data-test="register-email-input"]').type(user.email);
    cy.get('[data-test="register-password-input"]').type(user.password);
    // clicks submit button
    cy.get('[data-test="register-submit-btn"]').click();

    // redirects user to login page
    cy.url().should('include', '/login');
  })
});
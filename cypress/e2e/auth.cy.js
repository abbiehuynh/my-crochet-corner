// testing suite for user auth - login, logout, register

// user login 
describe('Login Page', () => {
  it('loads login page', () => {
    cy.visit('/login')
  })

  it('checks username input', () => {
    cy.visit('/login')

    // gets username input, types 'kingliver' into it
    cy.get('#formUsername').type('kingliver')

    // verifies that the value has been updated
    cy.get('#formUsername').should('have.value', 'kingliver')
  })
});

// user register
describe('Register Page', () => {
  it('successfully loads register page', () => {
    cy.visit('/register')
  })
});
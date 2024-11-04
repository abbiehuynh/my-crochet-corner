// testing suite for home page 

describe('The Home Page', () => {
  it('loads home page', () => {
    cy.visit('/home')

  })

  it('loads navigation bar', () => {
    cy.visit('/home')

    cy.get('#navbar-container').contains('My Crochet Corner')
    cy.contains('Home')
    cy.contains('Favorites')
    cy.contains('Profile')
  })

  // it('clicking "Favorites" navigates to a new url', () => {
  //   cy.visit('/home')

  //   cy.contains('Favorites').click()
  //   cy.url().should('include', '/favorites')


  // })


})


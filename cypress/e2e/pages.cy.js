// tests if each page loads

  describe('Favorite Page', () => {
    it('successfully loads favorites page', () => {
      cy.visit('/favorites')
    })
  })


  describe('Profile Page', () => {
    it('successfully loads profile page', () => {
      cy.visit('/profile')
    })
  })

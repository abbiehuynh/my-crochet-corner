// tests if each page loads - will be moved into their own pages in part 2

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

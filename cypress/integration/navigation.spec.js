const navItems = [
  { title: 'Explore', path: '/trails' },
  { title: 'Login', path: '/auth/login' },
  { title: 'Sign Up', path: '/auth/register' },
  { title: 'Explore', path: '/trails' },
  { title: 'Home', path: '/home' }
]

describe('navigation', () => {
  context('From home page', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Hanldes navigation links', () => {
      cy.wrap(navItems).each(({ title, path }) => {
        cy.get('.items-container > .nav-item').contains(title).click()

        cy.url().should('include', path)
      })
    })
  })

  context('Back to home page', () => {
    beforeEach(() => {
      cy.visit('/auth/login')
    })

    it('Logo link', () => {
      cy.get('.nav-container > .nav-logo').click()

      cy.url().should('include', '/home')
    })

    it('navigates back with back button', () => {
      cy.visit('/').go('back')

      cy.url().should('include', '/auth/login')
    })
  })
})

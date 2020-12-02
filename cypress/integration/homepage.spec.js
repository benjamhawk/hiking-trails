describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('shows the home page logo', () => {
    cy.get('.page-container').contains('Take a Hike')
    cy.get('.page-container').contains('Find Your Next Outdoor Adventure')
    cy.get('.page-container').find('app-trees')
  })

  it('can click start here and navigate to explore tab', () => {
    cy.get('button').click()
    cy.location('pathname').should('equal', '/trails')
  })
})

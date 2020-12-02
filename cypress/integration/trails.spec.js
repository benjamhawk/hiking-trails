describe('trails list page', () => {
  context('authenticated user', () => {
    beforeEach(() => {
      cy.login()
      cy.seedAndVisitTrailsList()
    })

    it('Shows a map', () => {
      cy.get('#map').should('be.visible')
      cy.scrollTo('bottom')
      cy.get('#map').should('be.visible')
    })

    it('shows correct number of cards', () => {
      cy.get('.card').should('have.length', 4)
    })

    it('on trail click, routes to trail page', () => {
      cy.fixture('trails').then(trails => {
        const id = trails.posts[0]['_id']

        cy.get('.view-btn').first().click()
        cy.location('pathname').should('eq', `/trails/${id}`)
      })
    })

    it('on click add trail redirects to form ', () => {
      cy.get('.add-btn').click()
      cy.location('pathname').should('eq', '/trails/create')
    })
  })

  context('unauthenticated user', () => {
    beforeEach(() => {
      cy.seedAndVisitTrailsList()
    })

    it('on click add trail redirects user to login ', () => {
      cy.get('.add-btn').click()
      cy.location('pathname').should('eq', '/auth/login')
    })

    it('on trail click, routes to trail page', () => {
      cy.fixture('trails').then(trails => {
        const id = trails.posts[0]['_id']

        cy.get('.view-btn').first().click()
        cy.location('pathname').should('eq', `/trails/${id}`)
      })
    })
  })
})

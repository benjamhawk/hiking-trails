// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('seedAndVisitTrailsList', () => {
  cy.server()
  cy.route('GET', '/trails*', 'fixture:trails').as('getTrails')
  cy.visit('/trails')
  cy.wait('@getTrails')
})

Cypress.Commands.add('login', (user = Cypress.env('userLogin')) => {
  cy.getLoginToken(user).then(res => {
    localStorage.setItem(
      'expiration',
      new Date(new Date().getTime() + 100000 * 1000).toISOString()
    )
    localStorage.setItem('name', res.name)
    localStorage.setItem('userId', res.userId)
    localStorage.setItem('token', res.token)
  })

  cy.visit('/')
})

Cypress.Commands.add('logout', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expiration')
  localStorage.removeItem('userId')
  localStorage.removeItem('name')

  cy.visit('/')
})

Cypress.Commands.add('getLoginToken', (user = Cypress.env('userLogin')) => {
  return cy
    .request({
      method: 'POST',
      url: `${Cypress.env('backendUrl')}/auth/login`,
      body: user,
      failOnStatusCode: false
    })
    .its('body')
    .should('exist')
})

Cypress.Commands.add('deleteTestUser', () => {
  cy.window().then(window => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('backendUrl')}/auth/user`,
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token')
      },
      body: window.localStorage.getItem('userId')
    })
  })
})

Cypress.Commands.add('deleteUserIfNeeded', user => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/auth/login`,
    body: user,
    failOnStatusCode: false
  })
    .its('body')
    .should('exist')
    .then(body => {
      cy.log(body)
      if (body.token) {
        cy.request({
          method: 'DELETE',
          url: `${Cypress.env('backendUrl')}/auth/user`,
          headers: {
            Authorization: 'Bearer ' + body.token
          },
          body: body.userId
        })
      }
    })
})

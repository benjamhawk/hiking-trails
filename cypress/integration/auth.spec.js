import {
  getInputFields,
  fillInTextFields,
  hasCorrectPlaceholders,
  hasInvalidClass,
  checkInputFieldErrFeedback,
  displaysFormErrFromServer,
  hasDisabledButton,
  getNavbarTitle,
  touchAndUntouchField
} from '../utils'

const regUser = {
  name: 'Bob Ross',
  email: 'testRegister@email.com',
  password: 'Password123!'
}

describe('auth forms', () => {
  const { name, email, password } = regUser

  context('Signup Form', () => {
    beforeEach(() => {
      cy.visit('/auth/register')
    })

    context('Happy Paths', () => {
      it('Contains placeholder text', () => {
        const placeholders = ['Name', 'Email', 'Password', 'Confirm Password']

        getInputFields().each(hasCorrectPlaceholders(placeholders))
      })

      it('Contains invalid state when empty', () => {
        getInputFields().each(hasInvalidClass)
      })

      it('Button is disabled when form is empty', () => {
        hasDisabledButton('Submit')
      })

      it('Sign up user', () => {
        const { email, password, name } = regUser
        // cy.login({ email, password })

        cy.deleteUserIfNeeded({ email, password })

        cy.visit('/auth/register')

        const textArr = [name, email, password, password]
        // below line creates an alias for login request
        // so that we can wait on it later
        // as this is an end-to-end test
        cy.server()
        cy.route('POST', '/auth/login').as('login')

        getInputFields().each(fillInTextFields(textArr))

        cy.get('.btn').should('not.have.attr', 'disabled')
        cy.get('.btn').click()

        cy.wait('@login')
        cy.location('pathname').should('eq', '/home')
        getNavbarTitle('Logout')

        cy.deleteTestUser()
      })
    })

    context('Errors', () => {
      beforeEach(() => {
        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="password"]').as('passwordInput')
        cy.get('input[name="passwordConfirmation"]').as(
          'passwordConfirmationInput'
        )
        cy.get('input[name="name"]').as('nameInput')
      })

      it('Displays Error Message if a field is touched and blank', () => {
        const errMsgs = [
          'Name Is Required',
          'Email Is Required',
          'Password Is Required',
          'Passwords Do Not Match'
        ]
        getInputFields().each(
          checkInputFieldErrFeedback(
            errMsgs,
            [name, email, password, password],
            i => touchAndUntouchField(cy.wrap(i))
          )
        )
      })

      it('Displays Err Message on invalid input', () => {
        const errMsgs = [
          // first not tested as name has no validation other than required and max length
          '',
          'Enter a Valid Email',
          'Password Must Be',
          'Passwords Do Not Match'
        ]
        getInputFields().each((input, i) => {
          if (i !== 0) {
            // skip name input
            checkInputFieldErrFeedback(
              errMsgs,
              ['', email, password, password],
              inp => cy.wrap(inp).type('hi')
            )(input, i)
          }
        })
      })

      it('Displays error when email is already used', () => {
        const errMsg =
          'Email aready in use. Please login or try again with a different email address.'

        const textArr = [
          regUser.name,
          regUser.email,
          regUser.password,
          regUser.password
        ]

        displaysFormErrFromServer(errMsg, textArr, '/auth/*')
      })
    })
  })

  context('Login Form', () => {
    const { email, password } = Cypress.env('userLogin')

    beforeEach(() => {
      cy.visit('/auth/login')
    })
    context('Happy Paths', () => {
      it('Contains placeholder text', () => {
        const placeholders = ['Email', 'Password']
        getInputFields().each(hasCorrectPlaceholders(placeholders))
      })

      it('Contains invalid state when empty', () => {
        getInputFields().each(hasInvalidClass)
      })

      it('Button is disabled when form is empty', () => {
        hasDisabledButton('Submit')
      })

      it('Login user', () => {
        getInputFields().each(fillInTextFields([email, password]))
        cy.get('.btn').click()
        cy.location('pathname').should('eq', '/home')

        getNavbarTitle('Logout')
      })

      it('Logs out user', () => {
        cy.login()
        getNavbarTitle('Logout').click()
      })
    })

    context('Errors', () => {
      beforeEach(() => {
        cy.get('input[name="email"]').as('emailInput')
        cy.get('input[name="password"]').as('passwordInput')
      })

      it('Displays Error Message if a field is touched and blank', () => {
        const errMsgs = ['Email Is Required', 'Password Is Required']
        getInputFields().each(
          checkInputFieldErrFeedback(errMsgs, [email, password], i =>
            touchAndUntouchField(cy.wrap(i))
          )
        )
      })

      it('Displays Err Message on invalid input', () => {
        const errMsgs = ['Enter a Valid Email', 'Password Must Be']
        getInputFields().each(
          checkInputFieldErrFeedback(errMsgs, [email, password], i =>
            cy.wrap(i).type('hi')
          )
        )
      })

      it('Displays error when login is incorrect', () => {
        const errMsg = 'Incorrect password'

        displaysFormErrFromServer(errMsg, [email, password], '/auth/*')
      })
    })
  })
})

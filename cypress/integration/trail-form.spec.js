import {
  getInputFields,
  fillInTextFields,
  checkInputFieldErrFeedback,
  touchAndUntouchField,
  hasCorrectPlaceholders,
  hasInvalidClass,
  hasValidClass,
  hasErrorText
} from '../utils'

const newPost = {
  name: 'This is a test trail',
  preview:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  imgUrl:
    'https://images.unsplash.com/photo-1539712258047-fd138a7e6737?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  longitude: 1,
  latitude: 5
}

describe('New Trail Form', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/trails/create')
  })

  context('Happy path', () => {
    it('Contains placeholder text', () => {
      getInputFields().each(
        hasCorrectPlaceholders([
          'Enter a name',
          'Enter URL to Cover Image',
          'Longitude',
          'Latitude'
        ])
      )

      cy.get('textarea').each(
        hasCorrectPlaceholders([
          'Enter a short preview of the trail description',
          'Enter a full description'
        ])
      )
    })

    it('creates a new trail', () => {
      cy.server()
      cy.route('POST', '/trails').as('createTrail')

      cy.get('.btn').should('have.attr', 'disabled')

      getInputFields().each(
        fillInTextFields([
          newPost.name,
          newPost.imgUrl,
          newPost.longitude,
          newPost.latitude
        ])
      )
      cy.get('textarea').each(
        fillInTextFields([newPost.preview, newPost.description])
      )

      cy.get('.btn').should('not.have.attr', 'disabled')
      cy.get('.btn').click()

      cy.wait('@createTrail')
      cy.location('pathname').should('equal', '/trails')

      cy.get('.card').contains(newPost.name)
      cy.request({
        method: 'DELETE',
        url: `${Cypress.env('backendUrl')}/trails/byName/${newPost.name}`,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    })
  })
  context('Errors', () => {
    it('Displays Error Message if a field is touched and blank', () => {
      const errMsgs = [
        'Name Is Required',
        'Image Url is Required',
        'Longitude is Required',
        'Latitude is Required'
      ]
      getInputFields().each(
        checkInputFieldErrFeedback(
          errMsgs,
          [newPost.name, newPost.imgUrl, newPost.longitude, newPost.latitude],
          i => touchAndUntouchField(cy.wrap(i))
        )
      )
    })

    it('Contains invalid state when empty', () => {
      getInputFields().each(hasInvalidClass)
      cy.get('textarea').each(hasInvalidClass)
    })

    it('Displays Err Message on invalid input', () => {
      cy.get('input[name="image"]').type('wrongUrl')
      cy.get('.container').click()
      hasErrorText('Enter a Valid URL beginning with http or https')

      cy.get('input[name="image"]')
        .clear()
        .type(newPost.imgUrl)
        .should('have.class', 'ng-valid')
      cy.get('.errors').should(
        'not.contain',
        'Enter a Valid URL beginning with http or https'
      )

      cy.get('input[name="latitude"]').type('500')
      cy.get('input[name="longitude"]').type('500')
      cy.get('.container').click()
      hasErrorText(
        'Longitude must be between -180 and 180. Latitude must be between -90 and 90.'
      )

      // TODO: The inputs for lat and long are not staying red when the numbers are out of range
      // leaving it for now as this will probably be changed
    })
  })
})

export const fillInTextFields = textArr => (input, i) => {
  cy.wrap(input)
    .type(textArr[i])
    .should('have.value', textArr[i])
    .and('have.class', 'ng-valid')
}

export const getInputFields = () => cy.get('input')

export const hasErrorText = text =>
  cy.get('.errors').contains(text, { matchCase: false })

export const hasCorrectPlaceholders = placeholderArr => (input, i) => {
  cy.wrap(input).should('have.attr', 'placeholder', placeholderArr[i])
}
export const hasInvalidClass = input => {
  cy.wrap(input).should('have.class', 'ng-invalid')
}
export const hasValidClass = input => {
  cy.wrap(input).should('have.class', 'ng-valid')
}

export const checkInputFieldErrFeedback = (
  errTextArr,
  inputTextArr,
  createErrState
) => (input, i) => {
  createErrState(input)
  cy.get('.container').click()
  hasErrorText(errTextArr[i])
  cy.wrap(input).clear().type(inputTextArr[i])
  hasValidClass(input)
}

export const displaysFormErrFromServer = (errMsg, textInputArr, url) => {
  cy.server()
  cy.route({
    url,
    method: 'POST',
    status: 500,
    response: {
      message: errMsg
    }
  })

  getInputFields().each((input, i) => {
    cy.wrap(input).type(textInputArr[i]).and('have.class', 'ng-valid')
  })

  cy.get('.btn').click()
  cy.get('.errors').contains(errMsg)
}

export const hasDisabledButton = text => {
  cy.get('.btn').contains(text).should('have.attr', 'disabled')
}

export const getNavbarTitle = title => {
  return cy.get('.items-container > .nav-item').contains(title)
}

export const touchAndUntouchField = input => {
  input.click()
  cy.get('.container').click()
}

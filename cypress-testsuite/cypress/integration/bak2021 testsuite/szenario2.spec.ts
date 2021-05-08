describe('Scenario 2 - Protractor', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  }) 

  it('check if marvel logo links to marvel.com', () => {
    cy.get('app-header header a.marvel').should('have.attr', 'href', 'https://www.marvel.com/')
  })

  it('check if footer copyright links to marvel.com', () => {
    cy.get('app-footer .copyright a').should('have.attr', 'href', 'https://www.marvel.com/')
  })
})
describe('Scenario 1 - Protractor', () => {
  it('check app is running', () => {
    cy.visit('http://localhost:4200')
    cy.url().should('include', '/home') // check if redirect is working
  })

  it('check if header component exists', () => {
    cy.get('app-header').should('be.visible')
  })

  it('check if navigation exists', () => {
    cy.get('app-header .navbar').should('exist')
  })

  it('check if navigation items exist', () => {
    cy.get('app-header .navbar').find('.nav-item').its('length').should('eq', 5)
    cy.get('app-header .navbar').find('.nav-item a[routerlink="favorites"]').should('not.exist')
  })

  it('check if footer component exists', () => {
    cy.get('app-footer').should('exist')
  })
})
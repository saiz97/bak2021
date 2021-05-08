describe('Scenario 5 - Protractor', () => {

  before(() => {
    cy.visit('http://localhost:4200/comics')
  }) 

  it('check if click on list-item leads to comic-detail-view', () => {
    cy.get('app-comic-list .comic-list .comic-item').first().click()
    cy.get('app-comic-detail .comic-detail-container').should('exist')
  })

  it('check detail-view has primary data displayed', () => {
    cy.get('.details h1 a').should('contain', 'Alien (2021) #2')
    cy.get('.published').should('exist').and('be.visible')
    cy.get('.creators').should('exist').and('be.visible')
    cy.get('.thumbnail').should('exist').and('be.visible')
  })

  it('check if the more-details section exists', () => {
    cy.get('.more-details').should('exist').and('be.visible')
  })

  it('check if the characters are displayed and hidden, if not existing', () => {
    cy.get('.characters').should('not.exist')
    cy.get('.nav-item a[routerLink=comics]').click()
    cy.get('app-comic-list .comic-list .comic-item').eq(2).click()
    cy.get('.characters', { timeout: 5000 }).should('exist')
  })

  it('check if like-btn is available and is disabled if user is not logged in', () => {
    cy.get('.btn-fav').should('be.disabled')
  })
})
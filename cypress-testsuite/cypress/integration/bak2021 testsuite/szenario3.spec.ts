
describe('Scenario 3 - Protractor', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  }) 

  it('check if home route is click- and reachable', () => {
    cy.get('app-header .navbar').find('.nav-item a[routerlink="home"]').click()
    cy.url().should('include', '/home')
  })

  it('check if articles are visible', () => {
    cy.get('app-home section.content').find('article').should('have.length', 3).and('be.visible')
  })

  it('check header text and images of articles', () => {
    cy.get('app-home section.content article .title').eq(0).then(text => expect(text.text().toLowerCase().trim()).to.eq('the purpose'))
    cy.get('app-home section.content article .image img').eq(0).should('be.visible');
    cy.get('app-home section.content article .title').eq(1).then(text => expect(text.text().toLowerCase().trim()).to.eq('the application'))
    cy.get('app-home section.content article .image img').eq(1).should('be.visible');
    cy.get('app-home section.content article .title').eq(2).then(text => expect(text.text().toLowerCase().trim()).to.eq('the author'))
    cy.get('app-home section.content article .image img').eq(2).should('be.visible');
  })
})
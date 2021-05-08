describe('Scenario 4 - Protractor', () => {
  before(() => {
    cy.visit('http://localhost:4200')
  }) 

  it('check if comics route is click- and reachable', () => {
    cy.get('app-header .navbar').find('.nav-item a[routerlink="comics"]').click()
    cy.url().should('include', '/comics')
    cy.get('app-comics .container').should('exist');
  })

  it('check if intro is visible', () => {
    cy.get('app-comics .intro').should('exist').and('be.visible');
  })

  it('check if year-select is exists and has data', () => {
     cy.get('app-comics .filter-container select').children().its('length').should('be.gt', 0)
     cy.get('app-comics .filter-container select').find(':selected').should('contain', '2021')
  })

  it('check if comic-list-item has mouse-hover', () => {
    const item = cy.get('app-comic-list .comic-list .comic-item').first()
    
    item.find('figcaption').should('not.be.visible')
    item.trigger('mouseover', {force: true}) // this will perform a mouseover-javascript-action and will not trigger css pseudo elements
    // item.find('figcaption').should('be.visible') // cypress is not able to trigger css hover states currently

  })

  it('check if new comics are loaded after selecting another year', () => {
    let before;
    let after;
    cy.get('app-comic-list .comic-list .comic-item').first().then(el => {
      before = el[0].id

      cy.get('app-comics .filter-container select').select('2019')
      cy.get('app-comic-list .comic-list .comic-item').first().then(el => {
        after = el[0].id
        expect(before).not.eq(after)
      })
    })
  })
  
  it('check if new comics are loaded when selecting another page of pagination', () => {
    let before;
    let after;
    cy.get('app-comic-list .comic-list .comic-item').first().then(el => {
      before = el[0].id

      cy.get('app-comics .filter-container .page-btn[value="2"]').click()
      cy.get('app-comic-list .comic-list .comic-item').first().then(el => {
        after = el[0].id
        expect(before).not.eq(after)
      })
    })
  })
})
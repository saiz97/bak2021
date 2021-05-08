describe('Scenario 7 - Protractor', () => {
  before(() => {
    cy.visit('http://localhost:4200')
    cy.window().then(window => {
      const userData = {
        email:"kwm@e2e.at",
        id:"nuBIxcCj7Uc6Qm028LNKAUvUXgj1",
        _token:"eyJhbGciOiJSUzI1NiIsImtpZCI6ImNjM2Y0ZThiMmYxZDAyZjBlYTRiMWJkZGU1NWFkZDhiMDhiYzUzODYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFrMjAyMS1tYXJ2ZWwtY29taWNzIiwiYXVkIjoiYmFrMjAyMS1tYXJ2ZWwtY29taWNzIiwiYXV0aF90aW1lIjoxNjIwNDg0MjY3LCJ1c2VyX2lkIjoibnVCSXhjQ2o3VWM2UW0wMjhMTktBVXZVWGdqMSIsInN1YiI6Im51Qkl4Y0NqN1VjNlFtMDI4TE5LQVV2VVhnajEiLCJpYXQiOjE2MjA0ODQyNjcsImV4cCI6MTYyMDQ4Nzg2NywiZW1haWwiOiJrd21AZTJlLmF0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImt3bUBlMmUuYXQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Jqjui1rNa4uKKhSym921HZU_NYcJ0nvTMWQLBAta3UDjBfEGHG7-mPAGz1MFhm25sJM28UCq-ArJMXcvXOvNLqI2M8JVh6U9vmT8U42Hka7_FyvdtOyhIvI_nipB-rsO8EVuDWJEFqgefp9ZE6kwKEJ-47wmN8xXkoAyKLKBiHxddCpg9KXgRJcci_Z94FOTL0R64Wz4UkLRjUWYuoIHeNsCEJuiARcsZhIWV28Zy1uGrXjXk6DwB1aAReOOq9mKlxk0HTs9Efp9z5jB4MB7HjFLdHrIy4rd-3-ouuOgMWjmiPfBpeQpImjVak1lTfzR64wM2O36BWoG9fDVPkUKyQ",
        _tokenExpirationDate:"2099-12-01T15:31:07.941Z"
      }
      window.localStorage.setItem('userData', JSON.stringify(userData))
      console.log(window.localStorage.getItem('userData'))
      cy.reload()
    })
  }) 

  
  it('check if user is logged in and located in app-favorites', () => {
    cy.window().then(window => {
      if(window.localStorage.getItem('userData') != null) 
        cy.get('.nav-item a[routerlink="favorites"]').click()
        cy.get('app-favorites').should('exist')
        cy.get('.comic-item').should('not.exist')
    })
  })

  it('check if user can add a comic to favorites', () => {
    cy.get('.nav-item a[routerlink="comics"]').click()
    cy.get('.comic-item').first().click()
    cy.get('.btn-fav').should('not.be.disabled').click()
  })

  it('check if favored comic exists in favorites', () => {
    cy.get('.nav-item a[routerlink="favorites"]').click()
    cy.get('.comic-item').should('exist')
  })

  it('check if favored comic can be disliked', () => {
    cy.get('.comic-item').click()
    cy.get('.btn-fav').then(text => expect(text.text().toLowerCase().trim()).to.eq('❤ dislike'))
    cy.get('.btn-fav').click()
  })

  it('check if favorite got removed from favorites-list', () => {
    cy.get('.nav-item a[routerlink="favorites"]').click()
    cy.get('app-favorites').should('exist')
    cy.get('.comic-item').should('not.exist')
  })
})
describe('Scenario 7 - Protractor', () => {
  before(() => {
    cy.visit('http://localhost:4200')
    cy.window().then(window => {
      const userData = {
        email:"kwm@e2e.at",
        id:"nuBIxcCj7Uc6Qm028LNKAUvUXgj1",
        _token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkOWNmYWE4OGVmMDViNDI0YmU2MjA1ZjQ2YjE4OGQ3MzI1N2JjNDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmFrMjAyMS1tYXJ2ZWwtY29taWNzIiwiYXVkIjoiYmFrMjAyMS1tYXJ2ZWwtY29taWNzIiwiYXV0aF90aW1lIjoxNjIxODUxMzg5LCJ1c2VyX2lkIjoibnVCSXhjQ2o3VWM2UW0wMjhMTktBVXZVWGdqMSIsInN1YiI6Im51Qkl4Y0NqN1VjNlFtMDI4TE5LQVV2VVhnajEiLCJpYXQiOjE2MjE4NTEzODksImV4cCI6MTYyMTg1NDk4OSwiZW1haWwiOiJrd21AZTJlLmF0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImt3bUBlMmUuYXQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.ZeYD7dA8u0TFKmGyTojz9a8b-yvz7kBSJ7WPSUjwNuVTciRpVmawDDvw-O3KeAf0C_iqpc8hbY_h5tGxwjEInnJWjlwTIKAsgs06MzPNmLbDvv8g5kkgNkQOPZ7V8655Oh9DFur44iMey3bByZ_3cmdLHhkaiFZm9AKjO2iDIUXKmPvpb84QMIM0eetE9tUxoCPLPyqeVEHMu1LvpIBQwIAtR3kNxKKNv_Cv7AxVB81I9vGcORouoSFghu6nua4CP_GlaCx8eKMtIS2QFf_B9WKsOEoEQXRN6ErfNFCtpkaeyoFo_3LAQ7UTUvpX8QA15Pc36mvKd7AfJ4MNOfwJWA",
        _tokenExpirationDate:"2030-05-25T11:16:29.560Z"
      }
      window.localStorage.setItem('userData', JSON.stringify(userData))
      cy.saveLocalStorage();
      cy.reload()
    })
  }) 

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.window().then(window => console.log("=== ", window.localStorage));
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });
  
  it('check if user is logged in and located in app-favorites', () => {
    cy.window().then(window => console.log("1 === ", window.localStorage));
    cy.window().then(window => {
      if(window.localStorage.getItem('userData') != null) {
        cy.get('.nav-item a[routerlink="favorites"]').click()
        cy.get('app-favorites').should('exist')
        cy.get('.comic-item').should('not.exist')
      }        
    })
  })

  it('check if user can add a comic to favorites', () => {
    cy.window().then(window => console.log("2 === ", window.localStorage));
    cy.get('.nav-item a[routerlink="comics"]').click()
    cy.get('.comic-item').first().click()
    cy.get('.btn-fav').should('not.be.disabled').click()
  })

  it('check if favored comic exists in favorites', () => {
    cy.window().then(window => console.log("3 === ", window.localStorage));
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
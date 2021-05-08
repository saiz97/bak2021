
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

describe('Scenario 6 - Protractor', () => {

  before(() => {
    cy.visit('http://localhost:4200')
    cy.clearLocalStorage()
  }) 

  beforeEach(() => {
    cy.restoreLocalStorage();
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('check if click on signup leads to signup-form', () => {
    cy.get('.nav-link[routerLink=signup]').click()
    cy.url().should('include', '/signup')
    cy.get('app-sign-up').should('exist')
  })

  it('check if switch to login is working and route changed', () => {
    cy.get('.btn-switch-mode').click()
    cy.url().should('include', '/login')
    cy.get('app-login').should('exist')
  })

  it('check if login button is disabled, when input-fields are empty', () => {
    cy.get('input[formcontrolname="email"]').invoke('val').should("be.empty");
    cy.get('input[formcontrolname="password"]').invoke('val').should("be.empty");
    cy.get('.btn-primary[type="submit"]').should("be.disabled");
  })

  it('check for error messages on invalid user input', () => {
    cy.get('input[formcontrolname="email"]').type('kwm');
    cy.get('.invalid-feedback div').contains('Email must be a valid email address');
    cy.get('input[formcontrolname="email"]').type('@e2e.at');
    cy.get('.invalid-feedback div').should('not.exist')
  })

  it('check if user can log in', () => {
    cy.get('input[formcontrolname="password"]').type('kwme2e')
    cy.get('.btn-primary[type="submit"]').should("not.be.disabled").click()

    cy.get('app-loader').should('be.visible')
    cy.get('app-favorites').should('be.visible')    
  })

  it('check if user-sessions is stored', () => {
    cy.window().then(window => {
      expect(window.localStorage.getItem('userData')).not.null
    })
  })

  it('check if user-sessions still exists after reload', () => {
    cy.reload()
    cy.window().then(window => {
      expect(window.localStorage.getItem('userData')).not.null
    })
  })
})
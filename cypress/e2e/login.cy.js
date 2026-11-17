describe('Login no Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it('permite login válido', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.url().should('include', '/inventory.html')
    cy.get('#inventory_container').should('be.visible')
    cy.screenshot('login-valido')
  })

  it('exibe mensagem ao informar senha incorreta', () => {
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('senha_incorreta')
    cy.get('#login-button').click()

    cy.contains('Epic sadface: Username and password do not match any user in this service')
      .should('be.visible')
    cy.screenshot('login-senha-incorreta')
  })

  it('exibe mensagem para usuário bloqueado', () => {
    cy.get('#user-name').type('locked_out_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()

    cy.contains('Epic sadface: Sorry, this user has been locked out.')
      .should('be.visible')
    cy.screenshot('login-usuario-bloqueado')
  })
})

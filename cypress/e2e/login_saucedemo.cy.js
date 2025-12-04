describe('Login - SauceDemo (JavaScript puro)', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('Login com usuário padrão - sucesso', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('have.text', 'Products')
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('Login com usuário bloqueado - erro', () => {
    cy.get('[data-test="username"]').type('locked_out_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out')
  })

  it('Login com senha errada - erro', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('senha_errada')
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('contain', 'Username and password do not match')
  })
})
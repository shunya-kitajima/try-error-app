/// <reference types="cypress" />
describe('tries', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Email"]').type('user1@test.com')
    cy.get('input[placeholder="Password"]').type('password')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('shall navigate to dailydetail page', () => {
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 0)
    cy.wait(5000)
    cy.get('[data-testid="addDaily"]').click()
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-daily"]')
      .children()
      .last()
      .should('have.text', '2023/1/6')
    cy.get('[data-testid="link-to-try-0"]').click()
    cy.get('[data-testid="try-input"]').should('be.visible')
    cy.get('[data-testid="result-input"]').should('be.visible')
    cy.get('[data-testid="btn-try"]').should('be.visible')
    cy.get('[data-testid="back-to-index"]').should('be.visible')
  })
  it('shall navigate to index page', () => {
    cy.wait(5000)
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-daily"]')
      .children()
      .last()
      .should('have.text', '2023/1/6')
    cy.get('[data-testid="link-to-try-0"]').click()
    cy.get('[data-testid="back-to-index"]').should('be.visible')
    cy.get('[data-testid="back-to-index"]').click()
    cy.wait(5000)
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 1)
  })
  it('shall try CRUD works fine', () => {
    cy.wait(5000)
    cy.get('[data-testid="link-to-try-0"]').should('be.visible')
    cy.get('[data-testid="link-to-try-0"]').click()
    cy.get('[data-testid="try-input"]').should('be.visible')
    cy.get('[data-testid="result-input"]').should('be.visible')
    cy.get('[data-testid="btn-try"]').should('be.visible')
    cy.get('[data-testid="ul-try"]').children().should('have.length', 0)

    cy.get('input[placeholder="try"]').type('???????????????10???')
    cy.get('textarea[placeholder="result"]').type('?????????????????????\n????????????')
    cy.get('[data-testid="btn-try"]').click()
    cy.wait(5000)
    cy.get('[data-testid="ul-try"]').children().should('have.length', 1)
    cy.get('[data-testid="try-0"]').should('be.visible')
    cy.get('[data-testid="result-0"]').should('be.visible')
    cy.get('[data-testid="try-0"]').should('have.text', '???????????????10???')
    cy.get('[data-testid="result-0"]').should(
      'have.text',
      '?????????????????????\n????????????'
    )
    cy.get('[data-testid="pencil-0"]').should('be.visible')
    cy.get('[data-testid="trash-0"]').should('be.visible')

    cy.get('[data-testid="pencil-0"]').click()
    cy.get('input[placeholder="try"]').type('2?????????')
    cy.get('textarea[placeholder="result"]').type('\n????????????????????????')
    cy.get('[data-testid="btn-try"]').should('have.text', 'update')
    cy.get('[data-testid="btn-try"]').click()
    cy.wait(5000)
    cy.get('[data-testid="try-0"]').should('have.text', '???????????????10???2?????????')
    cy.get('[data-testid="result-0"]').should(
      'have.text',
      '?????????????????????\n????????????\n????????????????????????'
    )

    cy.get('[data-testid="trash-0"]').click()
    cy.wait(5000)
    cy.get('[data-testid="ul-try"]').children().should('have.length', 0)
  })
})
export {}

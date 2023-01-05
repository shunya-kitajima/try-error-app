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
    cy.get('[data-testid="addDaily"]').click()
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 1)
    cy.get('[data-testid="ul-daily"]')
      .children()
      .last()
      .should('have.text', '2023/1/5')
  })
})
export {}

/// <reference types="cypress" />
describe('dailies', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('input[placeholder="Email"]').type('user1@test.com')
    cy.get('input[placeholder="Password"]').type('password')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('Shall daily create and delete fine', () => {
    cy.get('[data-testid="addDaily"]').click()
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 4)
    cy.get('[data-testid="ul-daily"]')
      .children()
      .should('have.text', '2023/1/5')
    cy.get('[data-testid="trash-daily-2023/1/5"]').click()
    cy.get('[data-testid="ul-daily"]').children().should('have.length', 4)
    cy.get('[data-testid="ul-daily"]')
      .children()
      .should('not.have.text', '2023/1/5')
  })
})
export {}

/// <reference types="cypress" />
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('Shall navigate to dailies page when login successfully', () => {
    cy.get('input[placeholder="Email"]').type('user1@test.com')
    cy.get('input[placeholder="Password"]').type('password')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('be.visible')
  })
  it('Shall navigate to Auth when logout clicked', () => {
    cy.get('input[placeholder="Email"]').type('user1@test.com')
    cy.get('input[placeholder="Password"]').type('password')
    cy.get('[type="submit"]').click()
    cy.get('[data-testid="logout"]').should('be.visible')
    cy.get('[data-testid="logout"]').click()
    cy.get('input[placeholder="Email"]').should('be.visible')
    cy.get('input[placeholder="Password"]').should('be.visible')
  })
})
export {}

/// <reference types="cypress" />

describe('Table', () => {
  it('', () => {
    cy.visit('http://localhost:2021')
    cy.window().then(() => {
      cy.get('.sxf-table__row').should('have.length', 5)
    })
  })
})

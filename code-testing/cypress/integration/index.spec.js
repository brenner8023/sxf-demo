/// <reference types="cypress" />

describe('Table', () => {
  beforeEach(() => {
    cy.visit('http://localhost:2021')
  })

  it('空状态', () => {
    cy.window().then(() => {
      cy.get('.sxf-empty').should('have.text', '空状态')
    })
  })

  it('表格正常展示', () => {
    cy.get('[utid=demo-1] .sxf-table__row').should('have.length', 29)
    cy.get('[utid=demo-1] .sxf-table-wrap').scrollTo('bottom')
    cy.get('[utid=demo-1]').find('.sxf-table__row:last-child').should('be.visible')
  })

  it('表格排序', () => {
    cy.get('[utid=asc-1]:first').click()
    cy.get('[utid=asc-1]:first').should('have.class', 'sxf-table-sorter__asc--selected')

    cy.get('[utid=asc-3]:first').click()
    cy.get('[utid=asc-3]:first').should('have.class', 'sxf-table-sorter__asc--selected')
  })

  it('表格分页', () => {
    cy.window().then(() => {
      cy.get('[utid=asc-1]:first').click()
      cy.get('[utid=asc-1]:first').should('have.class', 'sxf-table-sorter__asc--selected')

      cy.get('[utid=asc-3]:first').click()
      cy.get('[utid=asc-3]:first').should('have.class', 'sxf-table-sorter__asc--selected')
    })
  })
})

describe('Tabelas do Herokuapp', () => {
  const nomesOriginais = ['Smith', 'Bach', 'Doe', 'Conway']
  const nomesOrdenados = ['Bach', 'Conway', 'Doe', 'Smith']

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/tables')
  })

  it('exibe quatro linhas com os nomes esperados na primeira tabela', () => {
    cy.get('#table1 tbody tr')
      .should('have.length', 4)
      .each(($linha, indice) => {
        cy.wrap($linha).find('td').first().should('have.text', nomesOriginais[indice])
      })

    cy.screenshot('herokuapp-primeira-tabela')
  })

  it('ordena a primeira tabela ao clicar no título da coluna', () => {
    cy.get('#table1 thead th').first().click()

    cy.get('#table1 tbody tr')
      .should('have.length', 4)
      .each(($linha, indice) => {
        cy.wrap($linha).find('td').first().should('have.text', nomesOrdenados[indice])
      })

    cy.screenshot('herokuapp-tabela-ordenada')
  })
})

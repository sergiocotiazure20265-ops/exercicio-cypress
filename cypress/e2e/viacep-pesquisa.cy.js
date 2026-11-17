const VIA_CEP_URL = 'https://viacep.com.br/ws'

describe('Pesquisa de CEP na API ViaCEP', () => {
  it('retorna os dados de um CEP válido e existente', () => {
    const url = `${VIA_CEP_URL}/20040007/json/`

    cy.request({ method: 'GET', url, failOnStatusCode: false }).then((response) => {
      cy.writeFile('cypress/evidence/viacep-cep-valido.json', {
        request: { method: 'GET', url },
        response: { status: response.status, body: response.body },
      }).then(() => {
        expect(response.status).to.equal(200)
        expect(response.body).to.include({
          cep: '20040-007',
          localidade: 'Rio de Janeiro',
          uf: 'RJ',
        })
        expect(response.body).not.to.have.property('erro')
      })
    })
  })

  it('retorna erro para um CEP inválido ou inexistente', () => {
    const url = `${VIA_CEP_URL}/00000000/json/`

    cy.request({ method: 'GET', url, failOnStatusCode: false }).then((response) => {
      cy.writeFile('cypress/evidence/viacep-cep-invalido.json', {
        request: { method: 'GET', url },
        response: { status: response.status, body: response.body },
      }).then(() => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('erro', 'true')
      })
    })
  })
})

import discoveryResponse from '../fixtures/discovery.json'

before(() => {
  // provider is the same as PACTICIPANT in Makefile when pushing the provider contract
  cy.setupPact('pact-flow-bi-directional-consumer', 'pact-flow-bi-directional-provider')
})

describe('empty spec', () => {
  it('passes', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/discovery?query=*'
      },
      {
        statusCode: 200,
        body: discoveryResponse,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      }
    ).as('getDiscovery')
    cy.visit('http://localhost:8080/');
  })
})

after(() => {
  cy.usePactWait(['getDiscovery']).its('response.statusCode').should('eq', 200)
})

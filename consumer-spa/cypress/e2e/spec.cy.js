import discoveryResponse from '../fixtures/discovery.json'

before(() => {
  cy.setupPact('ui-consumer', 'api-provider')
})

describe('empty spec', () => {
  it('passes', () => {
    // cy.intercept('POST', 'http://muninn.prd.oasvc.itv.com/discovery').as('getDiscovery')
    cy.intercept(
      {
        method: 'POST',
        url: '**/discovery'
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

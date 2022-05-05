describe('WAPP > Quote', () => {
    context('Static Tree API', () => {
        let core;
        before(() => {
            cy.fixture('core_api').then((coreData) => {
                core = coreData;
            });
        });

        it('Verify Static Tree API returns no errors', () => {
            cy.request({
                method: 'GET',
                url: Cypress.config('baseUrl') + core.coreUrl,
                headers: {
                    'domain': core.headers.domain,
                    'product': core.headers.product,
                    'business-flow': core.headers.business_flow,
                    'exalt-api': 'STATIC_TREE',
                    'operation-flow': core.headers.operation_flow,
                },
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).property('message').to.equal('Static tree is retrieved successfully')
            });
        });
    });
});
/// <reference types="Cypress" />

describe('WAPP API', () => {
    context('Core API', () => {
        let core;
        let coreBaseUrl;
        let date = new Date();
        let dateGMT = new Date().getUTCHours();         

        before(() => {
            cy.fixture('core_api').then((coreData) => {
                core = coreData;
                coreBaseUrl = Cypress.config('baseUrl') + core.coreUrl;
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
                qs: {

                }
            }).then((request) => {
                cy.log(JSON.stringify(request))
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).property('message').to.equal(core.message.STATIC_TREE)
            });
        });

        it('Verify Static Document API returns no errors', () => {
            cy.request({
                method: 'GET',
                url: coreBaseUrl,
                headers: {
                    'domain': core.headers.domain,
                    'product': core.headers.product,
                    'business-flow': core.headers.business_flow,
                    'exalt-api': 'STATIC_DOCUMENT',
                    'operation-flow': core.headers.operation_flow,
                    'Content-Type': core.headers.Content_Type
                },
                qs: {
                    'domainCode': 'WAPP',
                    'documentType': 'TOB',
                    'category': 'policy',
                    'requestedDate': '2020-10-15',
                }
            }).then((request) => {
                cy.log(JSON.stringify(request))
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).property('message').to.equal(core.message.STATIC_DOCUMENT)
            });
        });

        it('Verify user CANNOT create an account with an email address already asssociated with an account', () => {
            cy.request({
                method: 'POST',
                url: coreBaseUrl,
                headers: {
                    'domain': core.headers.domain,
                    'product': core.headers.product,
                    'business-flow': core.headers.business_flow,
                    'exalt-api': 'USER_CREATE',
                    'operation-flow': core.headers.operation_flow,
                    'Content-Type': core.headers.Content_Type
                },
                body: {
                    "email": "madhawar@pm.me",
                    "lastName": "Intervest",
                    "firstName": "Madhawa",
                    "deviceCode": "1234567890",
                    "appVersion": "1",
                    "phone": "0713661579",
                    "countryCode": "GB44",
                    "loginPassword": "January*27",
                    "dob": "1989-05-27",
                    "baseUrl": coreBaseUrl,
                    "audit": {
                        "localTime": '2022-05-06 09:50:56',
                        "GMTTime": '2022-05-06 09:50:56',
                        "appRequestedTime": '2022-05-06 09:50:56',
                        "agentId": 1,
                        "agentName": "App",
                        "channel": "APP"
                    }
                }
            }).then((request) => {
                cy.log(JSON.stringify(request))
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).property('message').to.equal('Whoops, that email address is already registered with Wapp')
            });
        });

        it('Verify user can create an account with an email address NOT already asssociated with an account', () => {
            cy.request({
                method: 'POST',
                url: coreBaseUrl,
                headers: {
                    'domain': core.headers.domain,
                    'product': core.headers.product,
                    'business-flow': core.headers.business_flow,
                    'exalt-api': 'USER_CREATE',
                    'operation-flow': core.headers.operation_flow,
                    'Content-Type': core.headers.Content_Type
                },
                body: {
                    "email": "madhawax@pm.me",
                    "lastName": "Intervest",
                    "firstName": "Madhawa",
                    "deviceCode": "1234567890",
                    "appVersion": "1",
                    "phone": "0713661579",
                    "countryCode": "GB44",
                    "loginPassword": "January*27",
                    "dob": "1989-05-27",
                    "baseUrl": coreBaseUrl,
                    "audit": {
                        "localTime": '2022-05-06 09:50:56',
                        "GMTTime": '2022-05-06 09:50:56',
                        "appRequestedTime": '2022-05-06 09:50:56',
                        "agentId": 1,
                        "agentName": "App",
                        "channel": "APP"
                    }
                }
            }).then((request) => {
                cy.log(JSON.stringify(request))
            }).then((response) => {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.eq(200)
                expect(response.body).property('message').to.equal('Time to check your emails to verify your email address with us')
            });
        });


    });
});
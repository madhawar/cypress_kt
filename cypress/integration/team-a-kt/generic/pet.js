class Pet {

    goto_landing_page_and_accept_cookies(ENVIRONMENT) {
        cy.visit(ENVIRONMENT)
        cy.get('#accept-all').click()
        cy.url().should('include', 'pet-details')
        cy.get('.logo-pet').should('be.visible')
    };

    fill_name(NAME) {
        cy.get('#petName').type(NAME)
    };

    select_pet_type(TYPE) {
        if (TYPE = 'cat') {
            cy.get("span").contains("Cat").click()
        } else if (TYPE = 'dog') {
            cy.get("span").contains("Dog").click()
        }
    }

    select_gender(GENDER) {
        if (GENDER = 'male') {
            cy.get("span").contains("Male").click()
        } else if (GENDER = 'female') {
            cy.get("span").contains("Female").click()
        }
    }

    fill_birthday(DAY, MONTH, YEAR) {
        cy.get('#day').type(DAY)
        cy.get('#month').type(MONTH)
        cy.get('#year').type(YEAR)

    }

}

export default Pet
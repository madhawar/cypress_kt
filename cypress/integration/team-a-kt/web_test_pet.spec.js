/// <reference types="Cypress" />

import Pet from './generic/pet'
// TODO
describe('Petsure', function () {
    const petsure = new Pet()

    let pet;
    before(() => {
        cy.fixture('pet_data').then((petData) => {
            pet = petData;
        });
    });

    it('E2E FLOW', function () {

        petsure.goto_landing_page_and_accept_cookies(pet.petUrl);
        petsure.fill_name(pet.pet_details.name);
        petsure.select_pet_type(pet.pet_details.type);
        petsure.select_gender(pet.pet_details.gender);
        petsure.fill_birthday(pet.pet_details.dob_dd, pet.pet_details.dob_mm, pet.pet_details.dob_yyyy)
    })

})

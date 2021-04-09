Cypress.Commands.add('userLogin', () => {
  const fakeUser = {
    email: 'hello@dannyjaco.me',
    password: 'password',
  };

  cy.findByRole('button', { name: /login/i }).click();
  cy.findByRole('textbox', { name: /email/i }).type(fakeUser.email);
  cy.findByLabelText('password').type(fakeUser.password);
  cy.findByRole('button', { name: /login/i }).click();
});

Cypress.Commands.add('fetchSearchResults', () => {
  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10',
    { fixture: 'fakeSearchResults.json' }
  ).as('searchResults');

  cy.visit('/search/Breakfast/Los%20Angeles,%20CA');

  cy.wait('@searchResults');
});

Cypress.Commands.add('fillSearchBar', () => {
  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=Breakfast',
    { fixture: 'fakeTermParamResults.json' }
  ).as('termParamResults');

  cy.intercept(
    'GET',
    'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=3&namePrefix=Los%20Angeles,%20CA&countryIds=US',
    { fixture: 'fakeLocationParamResults.json' }
  ).as('locationParamResults');

  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10',
    { fixture: 'fakeSearchResults.json' }
  ).as('searchResults');

  cy.findByRole('textbox', { name: /find/i }).type('Breakfast');

  cy.wait('@termParamResults');

  cy.findByRole('textbox', { name: /near/i }).type('Los Angeles, CA');

  cy.wait('@locationParamResults');

  cy.findByRole('button', { name: /search/i }).click();

  cy.wait('@searchResults');
});

Cypress.Commands.add('routeRestaurantProfile', () => {
  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/met-her-at-a-bar-los-angeles-2/reviews',
    { fixture: 'fakeRestaurantReviewsData.json' }
  ).as('fakeRestaurantReviewsData');

  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/met-her-at-a-bar-los-angeles-2',
    { fixture: 'fakeRestaurantProfileData.json' }
  ).as('fakeRestaurantProfileData');

  cy.findByRole('heading', { name: /3/ }).click();

  cy.wait('@fakeRestaurantProfileData');
  cy.wait('@fakeRestaurantReviewsData');
});

Cypress.Commands.add('userLogout', () => {
  cy.findByRole('button', { name: /toggle menu/i }).click();

  cy.findByRole('button', { name: /logout/i }).click();
});

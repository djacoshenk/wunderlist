Cypress.Commands.add('fetchSearchResults', () => {
  cy.intercept(
    'GET',
    'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los+Angeles,+CA&sort_by=best_match&limit=10',
    { fixture: 'fakeSearchResults.json' }
  ).as('searchResults');

  cy.visit('/search/Breakfast/Los%20Angeles,%20CA');

  cy.wait('@searchResults');
});

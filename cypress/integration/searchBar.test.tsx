describe('search bar', () => {
  it('renders search bar results', () => {
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

    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Burgers&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10',
      { fixture: 'fakeMoreSearchResults.json' }
    ).as('moreSearchResults');

    cy.visit('/');

    cy.findByRole('textbox', { name: /find/i }).type('Breakfast');

    cy.wait('@termParamResults');

    cy.findByRole('textbox', { name: /near/i }).type('Los Angeles, CA');

    cy.wait('@locationParamResults');

    cy.findByRole('button', { name: /search/i }).click();

    cy.wait('@searchResults');

    cy.findByRole('textbox', { name: /find/i }).type('Burgers');

    cy.findByRole('button', { name: /search/i }).click();

    cy.wait('@moreSearchResults');
  });
});

describe('restaurant cards', () => {
  it('should update the link in the card', () => {
    cy.intercept(
      'GET',
      'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=3&namePrefix=Los%20Angeles,%20CA&countryIds=US',
      { fixture: 'fakeLocationParamResults.json' }
    ).as('locationParamResults');

    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Burgers&location=Los+Angeles,+CA&sort_by=best_match&limit=10',
      { fixture: 'fakeMoreSearchResults.json' }
    ).as('moreSearchResults');

    cy.visit('/');

    cy.findByRole('link', { name: /burgers/i }).click();

    cy.findByRole('alert');

    cy.findByRole('textbox', { name: /near/i }).type('Los Angeles, CA');

    cy.wait('@locationParamResults');

    cy.findByRole('link', { name: /burgers/i }).click();

    cy.wait('@moreSearchResults');
  });
});

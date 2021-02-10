describe('lazy loading', () => {
  it('should fetch more results', () => {
    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10&offset=20',
      { fixture: 'fakeEvenMoreSearchResults' }
    ).as('evenMoreSearchResults');

    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10&offset=10',
      { fixture: 'fakeMoreSearchResults' }
    ).as('moreSearchResults');

    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=best_match&limit=10',
      { fixture: 'fakeSearchResults' }
    ).as('searchResults');

    cy.visit('/search/Breakfast/Los%20Angeles,%20CA');

    cy.wait('@searchResults');

    cy.findByTestId('loader-bubble-container').scrollIntoView();

    cy.wait('@moreSearchResults');

    cy.findByTestId('loader-bubble-container').scrollIntoView();

    cy.wait('@evenMoreSearchResults');
  });
});

describe('sort by button', () => {
  it('should generate a new set of sorted results', () => {
    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=rating&limit=10',
      { fixture: 'fakeSortByRatingResults.json' }
    ).as('sortByRatingResults');

    cy.intercept(
      'GET',
      'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=Breakfast&location=Los%20Angeles,%20CA&sort_by=review_count&limit=10',
      { fixture: 'fakeSortByReviewCountResults.json' }
    ).as('sortByReviewCountResults');

    cy.fetchSearchResults();

    cy.findByRole('button', { name: /best match/i }).click();

    cy.findByRole('option', { name: /rating/i }).click();

    cy.wait('@sortByRatingResults');

    cy.findByRole('button', { name: /rating/i }).click();

    cy.findByRole('option', { name: /review count/i }).click();

    cy.wait('@sortByReviewCountResults');
  });
});

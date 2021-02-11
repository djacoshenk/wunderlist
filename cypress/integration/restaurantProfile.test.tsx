describe('restaurnt profile', () => {
  it('should route to profile page', () => {
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

    cy.fetchSearchResults();

    cy.findByRole('heading', { name: /3/ }).click();

    cy.wait('@fakeRestaurantProfileData');
    cy.wait('@fakeRestaurantReviewsData');
  });
});

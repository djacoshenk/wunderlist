describe('current location', () => {
  it('captures current location', () => {
    cy.intercept(
      'GET',
      'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=1&location=34.039-118.263&radius=5',
      { fixture: 'fakeCurrentLocation' }
    ).as('getCurrentLocation');

    cy.visit('/');
    cy.findByRole('button', { name: /current location/i }).click();

    cy.wait('@getCurrentLocation');
  });
});

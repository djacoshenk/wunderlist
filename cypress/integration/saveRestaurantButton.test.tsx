describe('save restaurant button', () => {
  it('should save restaurant', () => {
    cy.userLogin();

    cy.fillSearchBar();

    cy.routeRestaurantProfile();

    cy.findByRole('button', { name: /save/i }).click();

    cy.findByRole('link', { name: /danny/i }).click();

    cy.wait(1000);

    cy.findByRole('heading', { name: /1/i }).click();

    cy.findByRole('button', { name: /saved/i }).click();

    cy.findByRole('link', { name: /danny/i }).click();

    cy.wait(1000);

    cy.userLogout();
  });
});

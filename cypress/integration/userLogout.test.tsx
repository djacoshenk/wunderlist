describe('user logout', () => {
  it('should log out user', () => {
    cy.visit('/');

    cy.userLogin();

    cy.wait(4000);

    cy.findByRole('button', { name: /toggle menu/i }).click();

    cy.findByRole('button', { name: /logout/i }).click();
  });
});

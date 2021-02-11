describe('user logout', () => {
  it('should log out user', () => {
    cy.userLogin();

    cy.findByRole('button', { name: /toggle menu/i }).click();

    cy.findByRole('button', { name: /logout/i }).click();
  });
});

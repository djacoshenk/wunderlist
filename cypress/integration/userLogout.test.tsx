describe('user logout', () => {
  it('should log out user', () => {
    cy.fixture('fakeCurrentUserData').then((user) => {
      window.localStorage.setItem('registeredUsers', JSON.stringify(user));
    });

    cy.visit('/');

    cy.userLogin();

    cy.findByRole('button', { name: /toggle menu/i }).click();

    cy.findByRole('button', { name: /logout/i }).click();
  });
});

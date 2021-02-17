describe('login page', () => {
  it('route to register page and fill out form', () => {
    const fakeUser = {
      username: 'djacoshenk',
      password: 'password123',
    };

    cy.fixture('fakeCurrentUserData').then((user) => {
      window.localStorage.setItem('registeredUsers', JSON.stringify(user));
    });

    cy.visit('/');

    cy.findByRole('button', { name: /login/i }).click();

    cy.findByRole('textbox', { name: /username/i }).type(fakeUser.username);

    cy.findByLabelText('password').type(fakeUser.password);

    cy.findByRole('button', { name: /login/i }).click();
  });
});

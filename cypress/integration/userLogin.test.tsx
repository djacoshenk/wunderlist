describe('login page', () => {
  it('route to register page and fill out form', () => {
    const fakeUser = {
      email: 'hello@dannyjaco.me',
      password: 'password',
    };

    cy.visit('/');

    cy.findByRole('button', { name: /login/i }).click();

    cy.findByRole('textbox', { name: /email/i }).type(fakeUser.email);

    cy.findByLabelText('password').type(fakeUser.password);

    cy.findByRole('button', { name: /login/i }).click();

    cy.wait(4000);
  });
});

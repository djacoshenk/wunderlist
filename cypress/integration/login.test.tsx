beforeEach(() => {
  cy.fixture('fakeCurrentUserData').then((user) => {
    window.localStorage.setItem('registeredUsers', JSON.stringify(user));
  });
});

describe('login page', () => {
  it('route to register page and fill out form', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /login/i }).click();
    cy.findByRole('textbox', { name: /username/i }).type('djacoshenk');
    cy.findByLabelText('password').type('password123');
    cy.findByRole('button', { name: /login/i }).click();
  });
});

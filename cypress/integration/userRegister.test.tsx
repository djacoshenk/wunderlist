describe('register page', () => {
  it('route to register page and fill out form', () => {
    cy.visit('/');
    cy.findByRole('button', { name: /register/i }).click();
    cy.findByRole('textbox', { name: /first name/i }).type('Danny');
    cy.findByRole('textbox', { name: /last name/i }).type('Jacoshenk');
    cy.findByRole('textbox', { name: /email/i }).type('hello@dannyjaco.me');
    cy.findByRole('textbox', { name: /username/i }).type('djacoshenk');
    cy.findByLabelText('password').type('password123');
    cy.findByLabelText('confirm password').type('password123');
    cy.findByRole('button', { name: /register/i }).click();
  });
});

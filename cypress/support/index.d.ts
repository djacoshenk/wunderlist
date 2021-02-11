declare namespace Cypress {
  interface Chainable {
    userLogin(): Chainable<Element>;
    fetchSearchResults(): Chainable<Element>;
    fillSearchBar(): Chainable<Element>;
    routeRestaurantProfile(): Chainable<Element>;
    userLogout(): Chainable<Element>;
  }
}

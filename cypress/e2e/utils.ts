import { faker } from "@faker-js/faker";

export function userRegistrationAndLogin() {
  const loginForm = {
    email: `${faker.internet.userName()}@example.com`,
    name: faker.internet.displayName(),
  };

  cy.then(() => ({ email: loginForm.email })).as("user");

  cy.visitAndCheck("/");

  cy.findByRole("link", { name: /sign up/i }).click();

  cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);

  cy.findByRole("textbox", { name: /name/i }).type(loginForm.name);

  cy.findByRole("button", { name: /create account/i }).click();
}

export function userLogout() {
  cy.findByTestId("profile-menu-button").click();

  cy.findByRole("button", { name: /Sign out/i }).click();
  cy.findByRole("link", { name: /log in/i });
}

export function createReview() {
  cy.findByRole("link", { name: /restaurants/i }).click();
  cy.findByTestId("restaurant-link-0").click();
  cy.findByTestId("restaurant-menu-button").click();
  cy.findByTestId("product-link-0").click();
  cy.findByTestId("product-detail-review-button").click();

  const comment = "lorem ipsum - comment" + Math.floor(Math.random() * 100);
  cy.findByRole("textbox", { name: /comment/i }).type(comment);

  cy.findByTestId("rating-4").click();
  cy.findByTestId("submit-review").click();
  cy.findByText(comment);
}

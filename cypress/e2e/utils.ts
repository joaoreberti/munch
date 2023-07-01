import { faker } from "@faker-js/faker";

export function userRegistrationAndLogin() {
  const loginForm = {
    email: `${faker.internet.userName()}@example.com`,
  };

  cy.then(() => ({ email: loginForm.email })).as("user");

  cy.visitAndCheck("/");

  cy.findByRole("link", { name: /sign up/i }).click();

  cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
  cy.findByRole("button", { name: /create account/i }).click();
}

export function userLogout() {
  cy.findByTestId("profile-menu-button").click();

  cy.findByRole("button", { name: /Sign out/i }).click();
  cy.findByRole("link", { name: /log in/i });
}

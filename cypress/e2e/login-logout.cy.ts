import { userLogout, userRegistrationAndLogin } from "./utils";

describe("logging in, logging out", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login, visit restaurants page and logout", () => {
    userRegistrationAndLogin();
    cy.findByRole("link", { name: /restaurants/i }).click();

    userLogout();
  });

  it("should allow you to click on a restaurant and see its details", () => {
    userRegistrationAndLogin();

    cy.findByRole("link", { name: /restaurants/i }).click();
    // cy.findByTestId("restaurant-link-0").click();

    userLogout();
  });
});

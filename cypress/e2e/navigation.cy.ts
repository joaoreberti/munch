import { userLogout, userRegistrationAndLogin } from "./utils";

describe("While on the restaurant detail view", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });

  it("should allow us to visit products and then back", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
    cy.findByTestId("restaurant-link-0").click();

    cy.findByTestId("restaurant-menu-button").click();
    cy.findByTestId("back-to-restaurant").click();

    cy.findByTestId("restaurant-menu-button").click();
  });
});

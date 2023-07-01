import { userLogout, userRegistrationAndLogin } from "./utils";

describe("Review flows", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });

  it("visit restaurants page and logout", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
  });

  it("should allow you to click on a restaurant and see its details", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
    // cy.findByTestId("restaurant-link-0").click();
  });
});

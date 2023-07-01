import { userLogout, userRegistrationAndLogin } from "./utils";

describe("While on the restaurant list view", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });

  it("should allow us to search by restaurant", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
    // cy.findByRole("textbox", { name: /search/i }).type("pizzeria");
  });

  it("should allow us to retrieve restaurants by cuisine", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
    cy.findByTestId("restaurant-link-0").click();
  });
});

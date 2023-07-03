import { userLogout, userRegistrationAndLogin } from "./utils";

describe("While on the restaurant list view", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });


  it("should allow us to retrieve restaurants by cuisine", () => {
    cy.findByRole("link", { name: /restaurants/i }).click();
    cy.findByTestId("mobile-filter-button").click();
    cy.findByTestId("filter-section").click();

    cy.findByTestId("filter-option-0").click();
    cy.findByTestId("filter-option-1").click();

    cy.findByRole("button", { name: /filter/i }).click();
  });
});

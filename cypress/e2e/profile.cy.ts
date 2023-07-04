import { createReview, userLogout, userRegistrationAndLogin } from "./utils";

describe("Review flows", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
    createReview();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });

  describe("when user visits its profile", () => {
    it("should be able to click on a review", () => {
      cy.findByTestId("profile-menu-button").click();

      cy.findByRole("button", { name: /profile/i }).click();
      cy.findByTestId("user-review-0").click();
    });
  });
});

import { userLogout, userRegistrationAndLogin } from "./utils";

describe("Review flows", () => {
  beforeEach(() => {
    userRegistrationAndLogin();
  });
  afterEach(() => {
    userLogout();
    cy.cleanupUser();
  });

  describe("when user visits a restaurant page", () => {
    it("should be able to leave a review", () => {
      cy.findByRole("link", { name: /restaurants/i }).click();
      cy.findByTestId("restaurant-link-0").click();
      cy.findByTestId("restaurant-detail-review-button").click();

      const comment = "lorem ipsum - comment" + Math.floor(Math.random() * 100);
      cy.findByRole("textbox", { name: /comment/i }).type(comment);

      cy.findByTestId("rating-4").click();
      cy.findByTestId("submit-review").click();
      cy.findByText(comment);
    });
  });

  describe("when user visits product page", () => {
    it("should be able to leave a review", () => {
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
    });
  });
});

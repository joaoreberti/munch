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

});

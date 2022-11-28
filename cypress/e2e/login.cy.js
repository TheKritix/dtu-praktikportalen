describe("LoginTest", () => {
  it("loads successfully", () => {
    cy.visit("http://localhost:3001/");

    cy.get("div.landingpage-buttons")
      .should("be.visible")
      .within(() => {
        cy.get("button").should("contain.text", "Employer");
      });
    cy.contains("Employer").click();
  });

  it("employerlogin", function () {
    cy.get("#formUsername").clear();
    cy.get("#formUsername").type("Test");
    cy.get("#formPassword").clear("1");
    cy.get("#formPassword").type("TestTest");
    cy.get(".d-grid > .btn")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.exist;
      });
    cy.wait(3000);

    /* ==== End Cypress Studio ==== */
  });

  it("profile after sign up", () => {
    cy.get("p").should("contain.text", "Arbejdsgiver");
    cy.wait(3000);
  });

  it("sign out", () => {
    cy.get(".logout").click();
    // localstorage should be empty
    cy.window().should((win) => {
      expect(win.localStorage.length).to.eq(0);
    });
  });
});

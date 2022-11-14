describe("LoginTest", () => {
  it("loads successfully", () => {
    cy.visit("localhost:3001/dtu-praktikportalen");

    cy.get("div.landingpage-buttons")
      .should("be.visible")
      .within(() => {
        cy.get("button").should("contain.text", "Employer");
      });
    cy.contains("Employer").click();
  });
  it("sign in & check localstorage", () => {
    cy.get("input[name='username']").type("cypress");
    cy.get("input[name='password'").type("12345678");
    cy.get("button[name='signin'")
      .click()
      .should(() => {
        expect(localStorage.getItem("user")).to.exist;
      });
  });

  it("profile after sign up", () => {
    cy.get("p").should("contain.text", "cypressuser");
  });
});

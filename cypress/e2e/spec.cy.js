describe("employer login", () => {
  it("passes", () => {
    cy.visit("http://localhost:3001/dtu-praktikportalen");
  });

  /* ==== Test Created with Cypress Studio ==== */
  it("employerlogin", function () {
    /* ==== Generated with Cypress Studio ==== */
    //cy.visit('http://localhost:3001/dtu-praktikportalen');
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".employee").click();
    cy.get("#formUsername").clear();
    cy.get("#formUsername").type("Oliver");
    cy.get("#formPassword").clear("1");
    cy.get("#formPassword").type("123456789");
    cy.get(".d-grid > .btn").click();
    cy.wait(3000);
    cy.get(".logout").click();
    /* ==== End Cypress Studio ==== */
  });
});

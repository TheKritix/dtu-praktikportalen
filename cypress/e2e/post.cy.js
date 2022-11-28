describe("empty spec", () => {
  /* ==== Test Created with Cypress Studio ==== */
  it("getPost", function () {
    /* ==== Generated with Cypress Studio ==== */
    /* cy.wait are delays for API's to get fetched */
    cy.visit("http://localhost:3001/dtu-praktikportalen/");
    cy.get(".employee > img").click();
    cy.get("#formUsername").clear();
    cy.get("#formUsername").type("Test");
    cy.get("#formPassword").clear("1");
    cy.get("#formPassword").type("TestTest");
    cy.get(".btn > span").click();
    cy.wait(1500);
    cy.get(".posts > span").click();
    cy.wait(1500);
    cy.get(".form-control").focus().type("Fiske");
    cy.get(".mb-3").contains("Fiskeskærer").click();
    cy.wait(500);
    cy.get(".post-overview > h4").contains("Overblik");
  });
});

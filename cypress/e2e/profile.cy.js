describe("LoginProfil", () => {
  it("tests LoginProfil", () => {
    cy.viewport(1018, 1041);
  
    cy.visit("http://localhost:3001/dtu-praktikportalen/");
  
    cy.contains("Employer").click();
  
    cy.get("#formUsername").click();
  
    cy.get("#formUsername").type("Test");
  
    cy.get("#formPassword").click();
  
    cy.get("#formPassword").type("TestTest");
  
    cy.get("body > div.fade.employee-login.modal.show > div > div > div > div.modal-body > form > div.d-grid.gap-2.mt-3 > button").click();
    cy.location("href").should("eq", "undefined");
  
    cy.get("#root > div:nth-child(2) > div > div.profile > div.profileMenu > button:nth-child(2)").click();
  
    cy.get("#root > div:nth-child(2) > div > div.profile > div.profileMenu > button:nth-child(3)").click();
  
    });
  });
  
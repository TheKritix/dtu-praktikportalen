const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const testdes = `testname${id}`;
describe("LoginProfil", () => {
  it("tests LoginProfil", () => {
    cy.viewport(1018, 1041);

    cy.visit("https://dtu.praktikportal.diplomportal.dk/");

    cy.contains("Employer").click();

    cy.get("#formUsername").click();

    cy.get("#formUsername").type("Test");

    cy.get("#formPassword").click();

    cy.get("#formPassword").type("TestTest");

    cy.get(
      "body > div.fade.employee-login.modal.show > div > div > div > div.modal-body > form > div.d-grid.gap-2.mt-3 > button"
    ).click();

    cy.wait(3000);
    //cy.get(".name-textbox").type("Holger Rune");
    cy.get("textarea")
      .focus()
      .clear()
      .type(testdes)
      .then(() => {
        cy.get(".save").click();
      });

    cy.wait(3000);

    cy.get(
      "#root > div:nth-child(2) > div > div.profile > div.profileMenu > button:nth-child(2)"
    ).click();

    cy.get(
      "#root > div:nth-child(2) > div > div.profile > div.profileMenu > button:nth-child(3)"
    ).click();

    cy.get(
      "#root > div:nth-child(2) > div > div.profile > div.profileMenu > button:nth-child(1)"
    ).click();
  });
});

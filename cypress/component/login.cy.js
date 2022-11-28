import Login from "../../src/components/login/login";
import { MemoryRouter } from "react-router-dom";
describe("Login Component Test", () => {
  it("Login Test", () => {
    cy.mount(
      <MemoryRouter>
        <Login show={true} />
      </MemoryRouter>
    );

    cy.get(".link-primary").click();
    cy.get("#formUsername").should("be.enabled");
    cy.get("#formEmail").should("be.enabled");
    cy.get("#formPassword").should("be.enabled");
    cy.get("#formName").should("be.enabled");
    cy.get(".btn").should("be.enabled");
  });
});

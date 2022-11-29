import InternshipList from "../../src/components/internship-list/internship-list";
import {MemoryRouter} from "react-router-dom";

describe("Internshiplist component test", () => {
    it("Internship card test", () => {
        cy.intercept("GET", "**/post", [
            {
                title: "Sandwich bread slicer at 7-Eleven",
                type: "Fuldtid",
                location: "Nørreport",
                description: "We're looking for a full time bread slicer at one of our underground locations. Hejsa.",
                startDate: "24/12/2022"
            },
            {
                title: "Novo Nordisk A/S CEO",
                type: "Praktik",
                location: "Remote job from home",
                description: "Novo Nordisk is looking for a qualified person to intern as CEO from their home office.",
                startDate: "1/4/2023"
            }
        ])
        cy.mount(
            <MemoryRouter>
                <InternshipList/>
            </MemoryRouter>
        )
        cy.get("[id=form-type-search]").should("be.visible")
        cy.get("[id=field-text-search]").should("be.visible")
        cy.get("[id=internship-card]").should("be.visible")
        })
    })
import Password from "../../src/components/profile/profileComponents/passwordSettings"
import Email from "../../src/components/profile/profileComponents/emailSettings"

describe('Password Component Test', () => {
  it('Password Test', () => {
    cy.mount(<Password />)
    cy.get('div.setting:nth-child(1) > input:nth-child(2)').should('be.enabled')
    cy.get('div.setting:nth-child(2) > input:nth-child(2)').should('be.enabled')
    cy.get('.save').should('be.enabled')
  })
})
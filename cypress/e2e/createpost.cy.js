describe('CreatePost', () => {

  it('tests CreatesPost', () => {

    //login to employer acc
    cy.visit("http://localhost:3001/");
    cy.contains("Employer").click();
    cy.get("input[name='username']").type("cypress");
    cy.get("input[name='password'").type("12345678");
    cy.get("button[name='signin'").click()

    //createpost
    cy.contains('Create Post').click();

    const p = 'cypress/fixtures/TEST-BANNER.jpg';

    cy.get('input[name=title]').type('CypressTestTitle')
    cy.get('select[name=type]').select('Praktik')
    cy.get('input[name=company]').type('CypressTestCompany')
    cy.get('input[name=location]').type('CypressTestLocation')
    cy.get('input[name=startdate]').type('CypressTestStartdate')
    cy.get('textarea[name=description]').type('CypressTestDescription')
    cy.get('input[name=contact]').type('CypressTestContact')
    cy.get('input[name=applyToEmail]').type('CypressTestEmail')
    cy.get('input[name=website]').type('CypressTestWebsite')
    cy.get('input[name=bannerImg]').selectFile(p);
    cy.contains('Opret stilling').click();

  })
})
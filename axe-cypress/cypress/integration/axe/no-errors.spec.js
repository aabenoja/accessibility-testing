describe('design prototypes axe', () => {
  it('catch all the errors', () => {
    cy.accessibilityViolations('https://alphagov.github.io/accessibility-tool-audit/test-cases.html')
      .should('be.empty');
  });
});
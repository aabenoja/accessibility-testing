Cypress.Commands.add('checkAccessibility', (...args) => 
  cy.visit(...args)
    .window()
    .then(win => {
      const axe = require('axe-core');
      win.eval(axe.source);
      return win.axe.run();
    })
);

Cypress.Commands.add('accessibilityViolations', (...args) =>
  cy.checkAccessibility(...args)
    .then(({ violations }) => violations)
);

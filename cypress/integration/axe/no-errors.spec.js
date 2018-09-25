describe('design prototypes axe', () => {
  it('does not have errors', () => {
    cy.visit('https://wtw-im.github.io/es-components/')
      .window().then(win => {
        const axe = require('axe-core');
        win.eval(axe.source);
        return window.axe.run();
      }).then(results => {
        expect(results.violations.length).to.equal(0);
      });
  });
});
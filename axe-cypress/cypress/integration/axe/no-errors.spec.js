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

  it('modal is error free', () => {
    cy.visit('http://prototypes-wtw.net/containers/#modals');
    cy.contains('Launch large modal').click();
    cy.window().then(win => {
      const axe = require('axe-core');
      win.eval(axe.source);
      return window.axe.run();
    }).then(results => {
      expect(results.violations.length).to.equal(0);
    });
  });
});
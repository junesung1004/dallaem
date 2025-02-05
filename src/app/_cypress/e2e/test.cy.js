// cypress/e2e/test.cy.js
describe("My First Test", () => {
  it("Visits the Kitchen Sink", () => {
    cy.visit("https://example.cypress.io");
    cy.contains("type").click();
  });
});

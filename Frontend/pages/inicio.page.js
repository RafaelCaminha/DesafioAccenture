class InicioPage {
  acessar() {
    return cy.visit(Cypress.expose("frontendUrl"));
  }

  abrirPracticeForm() {
    cy.contains(".card", "Forms").should("be.visible").click();
    cy.contains(".element-list li", "Practice Form").should("be.visible").click();
    cy.location("pathname").should("eq", "/automation-practice-form");
    return cy.get("#userForm").should("be.visible");
  }

  abrirBrowserWindows() {
    cy.contains(".card", "Alerts, Frame & Windows").should("be.visible").click();
    cy.contains(".element-list li", "Browser Windows").should("be.visible").click();
    cy.location("pathname").should("eq", "/browser-windows");
    return cy.get("#windowButton").should("be.visible");
  }

  abrirWebTables() {
    cy.contains(".card", "Elements").should("be.visible").click();
    cy.contains(".element-list li", "Web Tables").should("be.visible").click();
    cy.location("pathname").should("eq", "/webtables");
    return cy.get("#addNewRecordButton").should("be.visible");
  }

  abrirProgressBar() {
    cy.contains(".card", "Widgets").should("be.visible").click();
    cy.contains(".element-list li", "Progress Bar").should("be.visible").click();
    cy.location("pathname").should("eq", "/progress-bar");
    return cy.get("#progressBar").should("be.visible");
  }

  abrirSortable() {
    cy.contains(".card", "Interactions").should("be.visible").click();
    cy.contains(".element-list li", "Sortable").should("be.visible").click();
    cy.location("pathname").should("eq", "/sortable");
    return cy.get("#sortableContainer").should("be.visible");
  }
}

module.exports = new InicioPage();

class ProgressBarPage {
  barra(timeout = 4000) {
    return cy.get('#progressBar [role="progressbar"]', { timeout });
  }

  botaoControle() {
    return cy.get("#startStopButton");
  }

  iniciar() {
    return this.botaoControle().should("have.text", "Start").click();
  }

  parar() {
    return this.botaoControle().should("have.text", "Stop").click();
  }

  reiniciar() {
    cy.get("#resetButton").should("be.visible");
    // A aplicação cancela seu intervalo de 100 ms somente no ciclo seguinte ao 100%.
    cy.wait(150);
    return cy.get("#resetButton").should("be.visible").click();
  }
}

module.exports = new ProgressBarPage();

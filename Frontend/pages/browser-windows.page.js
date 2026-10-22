class BrowserWindowsPage {
  constructor() {
    this.janela = null;
  }

  abrirNovaJanela() {
    this.janela = null;
    cy.window().then((pagina) => {
      cy.spy(pagina, "open").as("abrirJanela");
    });
    cy.get("#windowButton").click();
    return cy.get("@abrirJanela").should("have.been.calledOnce").then((abrir) => {
      this.janela = abrir.firstCall.returnValue;
      return this.janela;
    });
  }

  obterJanela() {
    return cy.wrap(this.janela, { log: false });
  }

  fecharJanela() {
    return cy.then(() => {
      if (this.janela && !this.janela.closed) this.janela.close();
    });
  }
}

module.exports = new BrowserWindowsPage();

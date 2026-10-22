const { When, Then, After } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");
const browserWindows = require("./pages/browser-windows.page");

When("escolhe Alerts, Frame & Windows e acessa Browser Windows", () => {
  return inicio.abrirBrowserWindows();
});

When("solicita a abertura de uma nova janela", () => browserWindows.abrirNovaJanela());

Then("uma nova janela deve exibir a mensagem {string}", (mensagem) => {
  cy.window().then((paginaOriginal) => {
    browserWindows.obterJanela().should((janela) => {
      expect(Boolean(janela), "janela criada").to.equal(true);
      expect(janela === paginaOriginal, "janela diferente da original").to.equal(false);
      expect(janela.closed, "janela aberta").to.equal(false);
      expect(janela.location.pathname, "endereço da página de exemplo").to.equal("/sample");
      expect(janela.document.querySelector("#sampleHeading")?.textContent).to.equal(mensagem);
    });
  });
});

When("fecha a nova janela", () => browserWindows.fecharJanela());

Then("a nova janela deve estar fechada", () => {
  browserWindows.obterJanela().should((janela) => {
    expect(janela.closed, "janela fechada").to.equal(true);
  });
  cy.location("pathname").should("eq", "/browser-windows");
  cy.get("#windowButton").should("be.visible");
});

After({ tags: "@janelas" }, () => browserWindows.fecharJanela());

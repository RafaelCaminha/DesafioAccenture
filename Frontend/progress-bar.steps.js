const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");
const progresso = require("./pages/progress-bar.page");

function acessarProgressBar() {
  inicio.abrirProgressBar();
  return progresso.barra().should("have.attr", "aria-valuenow", "0");
}

function iniciarEInterromperProgresso() {
  progresso.iniciar();
  progresso.barra().should((barra) => {
    expect(Number(barra.attr("aria-valuenow")), "progresso iniciado")
      .to.be.at.least(10);
  });
  return progresso.parar();
}

function validarProgressoPausado() {
  progresso.botaoControle().should("have.text", "Start");
  return progresso.barra().should((barra) => {
    const valor = Number(barra.attr("aria-valuenow"));
    expect(valor, "valor após clicar em Stop").to.be.greaterThan(0);
    expect(valor, "parada antes de 25%").to.be.lessThan(25);
    expect(valor, "limite máximo permitido").to.be.at.most(25);
    expect(barra.text()).to.equal(`${valor}%`);
  });
}

function validarProgressoCompleto() {
  return progresso.barra(20000)
    .should("have.attr", "aria-valuenow", "100")
    .and("have.text", "100%");
}

function validarProgressoReiniciado() {
  progresso.barra().should("have.attr", "aria-valuenow", "0").and("have.text", "0%");
  progresso.botaoControle().should("be.visible").and("have.text", "Start");
  return cy.get("#resetButton").should("not.exist");
}

When("escolhe Widgets e acessa Progress Bar", acessarProgressBar);
When("inicia e interrompe o progresso antes de 25%", iniciarEInterromperProgresso);
Then("a barra deve estar pausada com valor menor ou igual a 25%", validarProgressoPausado);
When("retoma o progresso", () => progresso.iniciar());
Then("a barra deve atingir 100%", validarProgressoCompleto);
When("reinicia a barra de progresso", () => progresso.reiniciar());
Then("a barra deve voltar a 0% e permitir uma nova execução", validarProgressoReiniciado);

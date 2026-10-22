const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");
const sortable = require("./pages/sortable.page");

const ordemCrescente = ["One", "Two", "Three", "Four", "Five", "Six"];

function validarOrdem(ordem) {
  return sortable.itens().should((itens) => {
    const valores = [...itens].map((item) => item.textContent.trim());
    expect(valores, "ordem dos elementos da lista").to.deep.equal(ordem);
  });
}

function acessarSortable() {
  inicio.abrirSortable();
  sortable.abrirLista();
  return validarOrdem(ordemCrescente);
}

function alterarOrdem() {
  return sortable.arrastarParaPosicao("Six", 0);
}

function validarOrdemAlterada() {
  return validarOrdem(["Six", "One", "Two", "Three", "Four", "Five"]);
}

function ordenarElementos() {
  return sortable.ordenar(ordemCrescente);
}

When("escolhe Interactions e acessa Sortable", acessarSortable);
When("move o último elemento para o início da lista", alterarOrdem);
Then("a lista deve apresentar a ordem alterada", validarOrdemAlterada);
When("organiza os elementos por drag and drop em ordem crescente", ordenarElementos);
Then("a lista deve apresentar os elementos de One a Six em ordem crescente", () => {
  return validarOrdem(ordemCrescente);
});

const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");
const tabela = require("./pages/web-tables.page");
const { criarRegistro, editarRegistro } = require("./dados/registro");

let registrosOriginais;
let registrosCriados;
let registroAnterior;

function valoresDoRegistro(registro) {
  return [registro.nome, registro.sobrenome, registro.idade, registro.email,
    registro.salario, registro.departamento];
}

function validarRegistro(registro) {
  tabela.buscar(registro.email);
  return tabela.corpo().should((corpo) => {
    expect(tabela.dadosDosRegistros(corpo), "dados completos do registro")
      .to.deep.equal([valoresDoRegistro(registro)]);
  });
}

function validarExclusao(email) {
  tabela.buscar(email);
  return tabela.corpo().should((corpo) => {
    expect(tabela.dadosDosRegistros(corpo), "registro não encontrado após exclusão")
      .to.deep.equal([]);
  });
}

When("escolhe Elements e acessa Web Tables", () => {
  registrosCriados = [];
  registroAnterior = null;
  inicio.abrirWebTables();
  tabela.exibirTodos();
  return tabela.corpo().then((corpo) => {
    registrosOriginais = tabela.dadosDosRegistros(corpo);
  });
});

When("cria um novo registro na tabela", () => {
  const registro = criarRegistro();
  registrosCriados.push(registro);
  return tabela.criar(registro);
});

Then("o registro criado deve apresentar os dados informados", () => {
  return validarRegistro(registrosCriados[0]);
});

When("edita os dados do registro criado", () => {
  registroAnterior = registrosCriados[0];
  const atualizado = editarRegistro(registroAnterior);
  registrosCriados[0] = atualizado;
  return tabela.editar(registroAnterior.email, atualizado);
});

Then("o registro deve apresentar os dados atualizados", () => {
  validarExclusao(registroAnterior.email);
  return validarRegistro(registrosCriados[0]);
});

When("exclui o registro criado", () => {
  const { email } = registrosCriados[0];
  tabela.excluir(email);
  return validarExclusao(email);
});

When("cria {int} novos registros na tabela", (quantidade) => {
  registrosCriados = Array.from({ length: quantidade }, criarRegistro);
  return cy.wrap(registrosCriados, { log: false }).each((registro) => tabela.criar(registro));
});

Then("os {int} registros criados devem apresentar os dados informados", (quantidade) => {
  expect(registrosCriados).to.have.length(quantidade);
  tabela.exibirTodos();
  tabela.corpo().should((corpo) => {
    const dados = tabela.dadosDosRegistros(corpo);
    expect(dados).to.have.length(registrosOriginais.length + quantidade);
    expect(dados).to.have.deep.members([
      ...registrosOriginais,
      ...registrosCriados.map(valoresDoRegistro),
    ]);
  });
});

function excluirRegistrosEmLote() {
  expect(registrosCriados, "registros disponíveis para exclusão em lote").not.to.be.empty;
  return tabela.excluir(registrosCriados[0].email);
}

When("exclui um dos novos registros para remover o lote criado", excluirRegistrosEmLote);

Then("a tabela deve manter somente os registros originais", () => {
  tabela.exibirTodos();
  return tabela.corpo().should((corpo) => {
    expect(tabela.dadosDosRegistros(corpo), "registros originais preservados")
      .to.deep.equal(registrosOriginais);
  });
});

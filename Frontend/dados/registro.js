function criarRegistro() {
  return {
    nome: Cypress._.sample(["Ana", "Bruno", "Carla", "Diego"]),
    sobrenome: Cypress._.sample(["Silva", "Souza", "Costa", "Lima"]),
    email: `registro.${crypto.randomUUID()}@example.com`,
    idade: String(Cypress._.random(18, 65)),
    salario: String(Cypress._.random(2000, 15000)),
    departamento: Cypress._.sample(["Qualidade", "Engenharia", "Financeiro"]),
  };
}

function editarRegistro(registro) {
  return {
    ...registro,
    nome: `${registro.nome} Editado`,
    sobrenome: `${registro.sobrenome} Atualizado`,
    email: `editado.${crypto.randomUUID()}@example.com`,
    idade: String(Number(registro.idade) + 1),
    salario: String(Number(registro.salario) + 500),
    departamento: "Operacoes",
  };
}

module.exports = { criarRegistro, editarRegistro };

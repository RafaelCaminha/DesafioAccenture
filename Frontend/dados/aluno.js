const escolher = (opcoes) => Cypress._.sample(opcoes);

function criarAluno() {
  const localidades = {
    NCR: ["Delhi", "Gurgaon", "Noida"],
    "Uttar Pradesh": ["Agra", "Lucknow", "Merrut"],
    Haryana: ["Karnal", "Panipat"],
    Rajasthan: ["Jaipur", "Jaiselmer"],
  };
  const estado = escolher(Object.keys(localidades));
  const identificador = crypto.randomUUID().replaceAll("-", "");

  return {
    nome: escolher(["Ana", "Bruno", "Carla", "Diego"]),
    sobrenome: escolher(["Silva", "Souza", "Lima", "Costa"]),
    email: `aluno.${identificador}@example.com`,
    genero: escolher(["Male", "Female", "Other"]),
    telefone: `9${Cypress._.random(100000000, 999999999)}`,
    nascimento: {
      dia: Cypress._.random(1, 28),
      mes: Cypress._.random(0, 11),
      ano: Cypress._.random(1980, 2005),
    },
    disciplina: escolher(["Maths", "English", "Chemistry", "Physics"]),
    hobby: escolher(["Sports", "Reading", "Music"]),
    endereco: `Rua de Teste ${identificador.slice(0, 8)}, ${Cypress._.random(1, 999)}`,
    estado,
    cidade: escolher(localidades[estado]),
    arquivo: "Frontend/fixtures/anexo.txt",
  };
}

module.exports = { criarAluno };

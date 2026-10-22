const { When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const inicio = require("./pages/inicio.page");
const formulario = require("./pages/practice-form.page");
const { criarAluno } = require("./dados/aluno");

let aluno;

When("escolhe Forms e acessa Practice Form", () => inicio.abrirPracticeForm());

When("preenche todos os campos com dados aleatórios e anexa um arquivo de texto", () => {
  aluno = criarAluno();
  return formulario.preencher(aluno);
});

When("envia o formulário", () => formulario.enviar());

Then("deve visualizar o popup de confirmação com os dados informados", () => {
  formulario.popup().should("be.visible");
  cy.get("#example-modal-sizes-title-lg").should("have.text", "Thanks for submitting the form");

  const { dia, mes, ano } = aluno.nascimento;
  const nomeMes = new Intl.DateTimeFormat("en-US", { month: "long" })
    .format(new Date(ano, mes, dia));
  const valores = {
    "Student Name": `${aluno.nome} ${aluno.sobrenome}`,
    "Student Email": aluno.email,
    Gender: aluno.genero,
    Mobile: aluno.telefone,
    "Date of Birth": `${String(dia).padStart(2, "0")} ${nomeMes},${ano}`,
    Subjects: aluno.disciplina,
    Hobbies: aluno.hobby,
    Picture: "anexo.txt",
    Address: aluno.endereco,
    "State and City": `${aluno.estado} ${aluno.cidade}`,
  };

  Object.entries(valores).forEach(([campo, valor]) => {
    formulario.valorConfirmado(campo).should("have.text", valor);
  });
});

When("fecha o popup de confirmação", () => formulario.fecharPopup());

Then("o popup deve ser fechado", () => {
  formulario.popup().should("not.exist");
  cy.get("#userForm").should("be.visible");
});

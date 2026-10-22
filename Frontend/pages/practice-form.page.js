class PracticeFormPage {
  preencher(aluno) {
    cy.get("#firstName").type(aluno.nome);
    cy.get("#lastName").type(aluno.sobrenome);
    cy.get("#userEmail").type(aluno.email);
    cy.contains("#genterWrapper label", aluno.genero).click();
    cy.get("#userNumber").type(aluno.telefone);
    this.preencherNascimento(aluno.nascimento);
    cy.get("#subjectsInput").type(aluno.disciplina);
    cy.contains('[id^="react-select-2-option-"]', aluno.disciplina).click();
    cy.contains("#hobbiesWrapper label", aluno.hobby).click();
    cy.get("#uploadPicture").selectFile(aluno.arquivo);
    cy.get("#currentAddress").type(aluno.endereco);
    cy.get("#state").click();
    cy.contains('[id^="react-select-3-option-"]', aluno.estado).click();
    cy.get("#city").click();
    return cy.contains('[id^="react-select-4-option-"]', aluno.cidade).click();
  }

  preencherNascimento({ dia, mes, ano }) {
    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select(String(ano));
    cy.get(".react-datepicker__month-select").select(String(mes));
    return cy
      .get(
        `.react-datepicker__day--${String(dia).padStart(3, "0")}:not(.react-datepicker__day--outside-month)`,
      )
      .click();
  }

  enviar() {
    return cy.get("#submit").scrollIntoView().click();
  }

  popup() {
    return cy.get(".modal-content");
  }

  valorConfirmado(campo) {
    return cy.contains(".modal-content tbody tr", campo).find("td").eq(1);
  }

  fecharPopup() {
    return cy.get("#closeLargeModal").click();
  }
}

module.exports = new PracticeFormPage();

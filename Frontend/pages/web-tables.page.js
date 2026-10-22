class WebTablesPage {
  exibirTodos() {
    cy.get("#searchBox").clear();
    return cy.get(".web-tables-wrapper .pagination select").select("50");
  }

  corpo() {
    return cy.get(".web-tables-wrapper tbody");
  }

  dadosDosRegistros(corpo) {
    return [...corpo[0].querySelectorAll("tr")].map((linha) =>
      [...linha.querySelectorAll("td")].slice(0, 6).map((celula) => celula.textContent.trim()),
    ).filter((campos) => campos[3]);
  }

  buscar(email) {
    return cy.get("#searchBox").clear().type(email);
  }

  linhaDoRegistro(email) {
    return cy.contains(".web-tables-wrapper tbody td", new RegExp(`^${Cypress._.escapeRegExp(email)}$`))
      .closest("tr");
  }

  preencher(registro) {
    const campos = {
      firstName: registro.nome,
      lastName: registro.sobrenome,
      userEmail: registro.email,
      age: registro.idade,
      salary: registro.salario,
      department: registro.departamento,
    };
    Object.entries(campos).forEach(([id, valor]) => {
      cy.get(`#${id}`).clear().type(valor);
    });
    cy.get("#submit").click();
    return cy.get("#registration-form-modal").should("not.exist");
  }

  criar(registro) {
    cy.get("#addNewRecordButton").click();
    return this.preencher(registro);
  }

  editar(email, registro) {
    this.buscar(email);
    this.linhaDoRegistro(email).find('[title="Edit"]').click();
    return this.preencher(registro);
  }

  excluir(email) {
    this.buscar(email);
    return this.linhaDoRegistro(email).find('[title="Delete"]').click();
  }
}

module.exports = new WebTablesPage();

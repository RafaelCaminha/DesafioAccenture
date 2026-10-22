const {
  Given,
  When,
  Then,
  Before,
  After,
} = require("@badeball/cypress-cucumber-preprocessor");
const api = require("./book-store");

let leitor;

Before({ tags: "@api" }, () => {
  leitor = {};
  return cy.env(["usuario", "senha"], { log: false }).then((credenciais) => {
    const configurado = [credenciais.usuario, credenciais.senha].every(
      (value) => typeof value === "string" && value.trim().length > 0,
    );
    expect(
      configurado,
      "configure usuario e senha no cypress.env.json",
    ).to.equal(true);
    leitor.credenciais = credenciais;
  });
});

After({ tags: "@api" }, () => {
  if (!leitor.userId) return;
  return api
    .deletarUsuario(leitor.userId, leitor.credenciais)
    .then(({ status }) => {
      expect(status, "exclusão do usuário ao final do cenário").to.equal(204);
    });
});

function registrarLeitor() {
  return api.criarUsuario(leitor.credenciais).then(({ status, body }) => {
    if (status === 201) leitor.userId = body.userID;
    expect(status, "cadastro do leitor").to.equal(201);
    expect(body.userID, "identificador do leitor").to.be.a("string").and.not.be
      .empty;
    expect(body.username).to.equal(leitor.credenciais.usuario);
    expect(body.books, "coleção inicial").to.deep.equal([]);
  });
}

function gerarToken() {
  return api.gerarToken(leitor.credenciais).then(({ status, body }) => {
    expect(status, "geração do token").to.equal(200);
    expect(body.status).to.equal("Success");
    expect(
      typeof body.token === "string" && body.token.length > 0,
      "token preenchido",
    ).to.equal(true);
    expect(
      Date.parse(body.expires),
      "token ainda não expirou",
    ).to.be.greaterThan(Date.now());
    leitor.token = body.token;
  });
}

function confirmarAutorizacao() {
  return api.autorizar(leitor.credenciais).then(({ status, body }) => {
    expect(status, "consulta da autorização").to.equal(200);
    expect(body, "leitor autorizado").to.equal(true);
  });
}

function livrosDiferentes(livros) {
  const livrosDistintos = [
    ...new Map(livros.map((livro) => [livro.isbn, livro])).values(),
  ];
  expect(
    livrosDistintos.length,
    "ao menos dois livros distintos disponíveis",
  ).to.be.at.least(2);
  return livrosDistintos.slice(0, 2);
}

function validarLivro(livro) {
  expect(livro.isbn).to.be.a("string").and.not.be.empty;
  expect(livro.title).to.be.a("string").and.not.be.empty;
}

function consultarCatalogo() {
  return api.livros().then(({ status, body }) => {
    expect(status, "consulta do catálogo").to.equal(200);
    expect(body.books).to.be.an("array");
    leitor.books = livrosDiferentes(body.books);
    leitor.books.forEach(validarLivro);
  });
}

function alugarLivros() {
  return api
    .livrosAlugados(leitor.userId, leitor.token, leitor.books)
    .then(({ status, body }) => {
      expect(status, "associação dos livros").to.equal(201);
      expect(body.books).to.be.an("array").with.lengthOf(2);
      expect(body.books.map(({ isbn }) => isbn)).to.have.members(
        leitor.books.map(({ isbn }) => isbn),
      );
    });
}

function validarDetalhesDoLeitor() {
  return api.usuario(leitor.userId, leitor.token).then(({ status, body }) => {
    expect(status, "consulta dos detalhes do leitor").to.equal(200);
    expect(body.userId).to.equal(leitor.userId);
    expect(body.username).to.equal(leitor.credenciais.usuario);
    expect(body.books).to.be.an("array").with.lengthOf(2);
    expect(body.books.map(({ isbn }) => isbn)).to.have.members(
      leitor.books.map(({ isbn }) => isbn),
    );
    leitor.books.forEach((livroSelecionado) => {
      const livroRetornado = body.books.find(
        ({ isbn }) => isbn === livroSelecionado.isbn,
      );
      expect(livroRetornado).to.include({
        isbn: livroSelecionado.isbn,
        title: livroSelecionado.title,
        author: livroSelecionado.author,
        publisher: livroSelecionado.publisher,
      });
    });
  });
}

Given("que um novo leitor está cadastrado sem livros", registrarLeitor);

When("o leitor gera um token de acesso válido", gerarToken);

Then("sua autorização deve ser confirmada", confirmarAutorizacao);

Given("que o leitor está cadastrado e autorizado sem livros", () => {
  return registrarLeitor()
    .then(() => gerarToken())
    .then(() => confirmarAutorizacao());
});

When(
  "o leitor consulta o catálogo e escolhe dois livros distintos",
  consultarCatalogo,
);

When("aluga os dois livros escolhidos", alugarLivros);

Then(
  "os detalhes do leitor devem conter exatamente os dois livros escolhidos",
  validarDetalhesDoLeitor,
);

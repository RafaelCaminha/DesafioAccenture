function request(method, url, options = {}) {
  return cy.request({
    method,
    url,
    ...options,
    log: false,
    failOnStatusCode: false,
    retryOnStatusCodeFailure: false,
    retryOnNetworkFailure: false,
  });
}

const bearer = (token) => ({ Authorization: `Bearer ${token}` });

const dadosDeAcesso = ({ usuario, senha }) => ({
  userName: usuario,
  password: senha,
});

module.exports = {
  criarUsuario: (credenciais) =>
    request("POST", "/Account/v1/User", { body: dadosDeAcesso(credenciais) }),
  gerarToken: (credenciais) =>
    request("POST", "/Account/v1/GenerateToken", { body: dadosDeAcesso(credenciais) }),
  autorizar: (credenciais) =>
    request("POST", "/Account/v1/Authorized", { body: dadosDeAcesso(credenciais) }),
  livros: () => request("GET", "/BookStore/v1/Books"),
  livrosAlugados: (userId, token, books) =>
    request("POST", "/BookStore/v1/Books", {
      headers: bearer(token),
      body: { userId, collectionOfIsbns: books.map(({ isbn }) => ({ isbn })) },
    }),
  usuario: (userId, token) =>
    request("GET", `/Account/v1/User/${userId}`, { headers: bearer(token) }),
  deletarUsuario: (userId, credenciais) =>
    request("DELETE", `/Account/v1/User/${userId}`, {
      auth: { username: credenciais.usuario, password: credenciais.senha },
    }),
};

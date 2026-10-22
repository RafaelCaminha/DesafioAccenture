# language: pt
@api
Funcionalidade: Aluguel de livros
  Como leitor cadastrado
  Quero escolher livros do catálogo
  Para manter os livros escolhidos associados à minha conta

  @cadastro
  Cenário: Cadastrar e autorizar um novo usuário
    Dado que um novo leitor está cadastrado sem livros
    Quando o leitor gera um token de acesso válido
    Então sua autorização deve ser confirmada

  @emprestimo
  Cenário: Leitor autorizado aluga dois livros disponíveis
    Dado que o leitor está cadastrado e autorizado sem livros
    Quando o leitor consulta o catálogo e escolhe dois livros distintos
    E aluga os dois livros escolhidos
    Então os detalhes do leitor devem conter exatamente os dois livros escolhidos

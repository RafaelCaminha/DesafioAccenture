# language: pt
@frontend
Funcionalidade: Interações na interface da DemoQA
  Como visitante
  Quero utilizar os formulários, as janelas e as tabelas do site
  Para validar os resultados das minhas ações

  @formulario
  Cenário: Enviar o formulário completo e fechar a confirmação
    Dado que o visitante acessou a página inicial
    Quando escolhe Forms e acessa Practice Form
    E preenche todos os campos com dados aleatórios e anexa um arquivo de texto
    E envia o formulário
    Então deve visualizar o popup de confirmação com os dados informados
    Quando fecha o popup de confirmação
    Então o popup deve ser fechado

  @janelas
  Cenário: Abrir e fechar uma nova janela com a página de exemplo
    Dado que o visitante acessou a página inicial
    Quando escolhe Alerts, Frame & Windows e acessa Browser Windows
    E solicita a abertura de uma nova janela
    Então uma nova janela deve exibir a mensagem "This is a sample page"
    Quando fecha a nova janela
    Então a nova janela deve estar fechada

  @tabelas @crud
  Cenário: Criar, editar e excluir um registro em Web Tables
    Dado que o visitante acessou a página inicial
    Quando escolhe Elements e acessa Web Tables
    E cria um novo registro na tabela
    Então o registro criado deve apresentar os dados informados
    Quando edita os dados do registro criado
    Então o registro deve apresentar os dados atualizados
    Quando exclui o registro criado
    Então a tabela deve manter somente os registros originais

  @tabelas @bonus
  Esquema do Cenário: Criar e excluir registros dinamicamente
    Dado que o visitante acessou a página inicial
    Quando escolhe Elements e acessa Web Tables
    E cria <quantidade> novos registros na tabela
    Então os <quantidade> registros criados devem apresentar os dados informados
    Quando exclui um dos novos registros para remover o lote criado
    Então a tabela deve manter somente os registros originais

    Exemplos:
      | quantidade |
      | 12         |

  @progresso
  Cenário: Pausar o progresso antes de 25%, concluir e reiniciar
    Dado que o visitante acessou a página inicial
    Quando escolhe Widgets e acessa Progress Bar
    E inicia e interrompe o progresso antes de 25%
    Então a barra deve estar pausada com valor menor ou igual a 25%
    Quando retoma o progresso
    Então a barra deve atingir 100%
    Quando reinicia a barra de progresso
    Então a barra deve voltar a 0% e permitir uma nova execução

  @ordenacao
  Cenário: Ordenar os elementos da lista com drag and drop
    Dado que o visitante acessou a página inicial
    Quando escolhe Interactions e acessa Sortable
    E move o último elemento para o início da lista
    Então a lista deve apresentar a ordem alterada
    Quando organiza os elementos por drag and drop em ordem crescente
    Então a lista deve apresentar os elementos de One a Six em ordem crescente

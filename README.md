![](https://i.imgur.com/xG74tOh.png)

# 1ª Sprint - Back-end

**OBS. IMPORTANTE:** As nomenclaturas de tabelas, colunas e endpoints deverão seguir exatamente a especificação abaixo.

## MODELAGEM DO BANCO DE DADOS

Abaixo definiremos as tabelas que precisaremos ter nesta primeira versão do dashboard.

**Uma regra importante:** cada usuário poderá ter apenas 1 restaurante e cada restaurante deverá ter apenas 1 usuário associado, portanto um relacionamento de 1 para 1.

Estas tabelas deverão ser:
* Categoria
* Usuario
* Restaurante
* Produto

Detalharemos a estrutura de colunas de cada uma delas abaixo:


### CATEGORIA

Tabela para armazenar o pré-cadastro de categorias de restaurantes.

Para que o restaurante possa ser cadastrado deverá existir um pré-cadastro de categorias de restaurante. Estas categorias deverão estar persistidas em banco de dados de forma que possam ser selecionadas a cada vez que for realizado um novo cadastro de restaurante.
**A princípio** não precisaremos ter funcionalidade (tela) para administrar as categorias.

O pré-cadastro de categorias deverá possuir pelo menos as seguintes opções:

Diversos / Lanches / Carnes / Massas / Pizzas / Japonesa / Chinesa / Mexicano / Brasileira / Italiana / Árabe

| Coluna     | Tipo         | NOT NULL? | PK? | REFERENCES | DEFAULT   |
| --------   | --------     | --------- | --- | ---------- | -------   |
| id         | SERIAL       | Sim       | Sim |            |           |
| nome       | varchar(30)  | Sim       |     |            |           |

### USUARIO

Tabela para armazenar os dados e credenciais das pessoas que poderão acessar o dashboard.

| Coluna     | Tipo         | NOT NULL? | PK? | REFERENCES | DEFAULT   |
| --------   | --------     | --------- | --- | ---------- | -------   |
| id         | SERIAL       | Sim       | Sim |            |           |
| nome       | varchar(100) | Sim       |     |            |           |
| email      | varchar(100) | Sim       |     |            |           |
| senha      | text         | Sim       |     |            |           |

### RESTAURANTE

Tabela para armazenar os dados dos restaurantes e algumas de suas configurações.

| Coluna                | Tipo         | NOT NULL? | PK? | REFERENCES    | DEFAULT   |
| --------              | --------     | --------- | --- | ----------    | -------   |
| id                    | SERIAL       | Sim       | Sim |               |           |
| usuario_id            | integer      | Sim       |     | usuario(id)   |           |
| nome                  | varchar(50)  | Sim       |     |               |           |
| descricao             | varchar(100) |           |     |               |           |
| categoria_id          | integer      | Sim       |     | categoria(id) |           |
| taxa_entrega          | integer      | Sim       |     |               | 0         |
| tempo_entrega_minutos | integer      | Sim       |     |               | 30        |
| valor_minimo_pedido   | integer      | Sim       |     |               | 0         |

### PRODUTO

Tabela para armazenar os dados dos produtos ofertados pelos restaurantes.

| Coluna              | Tipo         | NOT NULL? | PK? | REFERENCES      | DEFAULT   |
| --------            | --------     | --------- | --- | ----------      | -------   |
| id                  | SERIAL       | Sim       | Sim |                 |           |
| restaurante_id      | integer      | Sim       |     | restaurante(id) |           |
| nome                | varchar(50)  | Sim       |     |                 |           |
| descricao           | varchar(100) |           |     |                 |           |
| preco               | integer      | Sim       |     |                 |           |
| ativo               | boolean      | Sim       |     |                 | TRUE      |
| permite_observacoes | boolean      | Sim       |     |                 | FALSE     |


## ENDPOINTS DA API

A fim de poder atender o front end da nossa solução, deveremos criar uma API que possa disponibilizar as funcionalidades básicas necessárias mencionadas no início.
Para isso precisaremos criar os endpoints conforme detalhamento abaixo.

**REGRAS GERAIS IMPORTANTES:**

* Apenas os dois primeiros endpoints (POST /usuarios e POST /login) não deverão exigir autenticação. **Todos os outros endpoints** deverão ser acessados apenas após realização de login e **com token de autorização válido**.
* Para **verificação da autenticação** dos usuários **DEVERÁ** ser utilizado um **middleware (filtro)** que seja utilizado em todos os endpoints correspondentes.
* **Todos os endpoints** deverão possuir **validações** para o body da requisição, de forma que caso algum dado seja fornecido incorretamente, **mensagens de erro apropriadas** deverão ser retornadas pela API.
* A API como um todo deverá seguir o padrão **REST**.
* Todos os **valores monetários** deverão ser tratados como **centavos**, portanto R$ 10,00 para a API deverá ser 1000.

### POST /usuarios

Endpoint para atender a funcionalidade de criar um novo usuário para o dashboard. Ele deverá receber tanto os dados do usuário quanto os dados do restaurante através de objeto JSON no corpo da requisição no formato abaixo.

Importante lembrar que:
* A senha deverá ser criptografada antes de ser persistida no banco de dados.
* Usuário estará em tabela diferente de Restaurante, portanto este mesmo endpoint precisará inserir dados em ambas as tabelas.

```json=
{
  "nome": "Nome Do Usuário",
  "email": "email.do.usuario@provedor.com",
  "senha": "abc123",
  "restaurante": {
    "nome": "Nome do Restaurante",
    "descricao": "Uma breve descrição do restaurante.",
    "idCategoria": 3,
    "taxaEntrega": 1000,
    "tempoEntregaEmMinutos": 30,
    "valorMinimoPedido": 1500
  }
}
```

### POST /login

Endpoint para realização de login dos usuários no dashboard, de forma que realize:
* A validação das credenciais do usuário (e-mail e senha), retornando mensagens adequadas quando as credenciais não forem válidas
* A autenticação dos usuários, gerando e retornando token válido como resposta

Este endpoint deverá receber as credenciais do usuário através de objeto JSON no corpo da requisição no seguinte formato:

```json=
{
  "email": "dono.do@restaurante.com",
  "senha": "scadulfax"
}
```


### GET /produtos

Endpoint para retornar uma lista de todos os produtos cadastrados naquele restaurante.
Não deverá receber conteúdo no corpo da requisição e nem parâmetros de qualquer espécie.

O retorno deverá ser um array JSON, contendo como itens os objetos JSON que representam cada um dos produtos.

Exemplo de retorno:

```json=
[
  {
    "id": 1,
    "id_restaurante": 1,
    "nome": "Contra filet acebolado",
    "descricao": "Acompanha arroz e fritas",
    "preco": 15000,
    "ativo": true,
    "permite_observacoes": false
  }
]
```

### GET /produtos/:id

Endpoint para retornar os detalhes de um produto em específico. Não deverá receber conteúdo no corpo da requisição, mas deverá receber um parâmetro no rota (params) que representa o ID do produto. Através do ID do produto, deverá buscar o produto correspondente e se existir, retorná-lo como objeto JSON no corpo da resposta.

Exemplo de retorno:

```json=
{
  "id": 1,
  "id_restaurante": 1,
  "nome": "Contra filet acebolado",
  "descricao": "Acompanha arroz e fritas",
  "preco": 15000,
  "ativo": true,
  "permite_observacoes": false
}
```

### POST /produtos

Endpoint para cadastrar um novo produto. Deverá receber um objeto JSON representando o produto (conforme formato no exemplo abaixo) e deverá cadastrá-lo no banco de dados relacionado ao restaurante.

O corpo da resposta não deverá possuir conteúdo.
Exemplo de objeto para o corpo da requisição:

```json=
{
  "nome": "Picanha com alho",
  "descricao": "Para 3 pessoas. Acompanha arroz e fritas",
  "preco": 12000,
  "permiteObservacoes": false
}
```

### PUT /produtos/:id

Endpoint para alterar os dados de um produto em específico. Deverá receber um objeto JSON representando o produto com os novos dados que se deseja persistir em banco de dados conforme formato no exemplo abaixo. Deverá receber também o ID do produto já existente como parâmetro de rota (params), através do qual o produto existente deverá ser buscado no banco de dados.

O corpo da resposta não deverá possuir conteúdo.
Exemplo de objeto para o corpo da requisição:

```json=
{
	"nome": "Contra filet acebolado",
	"descricao": "",
	"preco": 15000,
	"permiteObservacoes": false
}
```

### DELETE /produtos/:id

Endpoint para excluir um produto existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do produto através de parâmetro de rota (params). Através do ID o produto deverá ser buscado em banco de dados e excluído.

O corpo da resposta também não deverá possuir conteúdo.


### POST /produtos/:id/ativar

Endpoint para ativar um produto existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do produto como parâmetro de rota (params) conforme assinatura do endpoint no título acima.
Através do ID do parâmetro deverá buscar o produto existente e alterar o valor da coluna "ativo" para true.

O corpo da resposta não deverá possuir conteúdo.

### POST /produtos/:id/desativar

Endpoint para ativar um produto existente. Não deverá receber conteúdo no corpo da requisição, mas deverá receber o ID do produto como parâmetro de rota (params) conforme assinatura do endpoint no título acima.
Através do ID do parâmetro deverá buscar o produto existente e alterar o valor da coluna "ativo" para true.

O corpo da resposta não deverá possuir conteúdo.
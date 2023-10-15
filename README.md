# 🏢 API BANK CUBOS ACADEMY

<p align="center">
 <img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).<br>
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Projeto (Backend)

```bash

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000 

```

---

## 🛠 Tecnologias usadas

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)
![express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)

---

## Endpoints

### 📡 Listar contas bancárias

#### `GET` `/contas?senha_banco=Cubos123Bank`

Esse endpoint deverá listar todas as contas bancárias existentes.

- **Requisição** - query params (respeitando este nome)

  - senha_banco

### ➕ Criar conta bancária

#### `POST` `/contas`

Esse endpoint deverá criar uma conta bancária, onde será gerado um número único para identificação da conta (número da conta).

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

#### Exemplo de Requisição

```javascript
// POST /contas
{
    "nome": "Felipe",
    "cpf": "12345678910",
    "data_nascimento": "1996-12-04",
    "telefone": "99998888887",
    "email": "felipe@gmail.com",
    "senha": 1234
}
```

### 🔄 Atualizar usuário da conta bancária

#### `PUT` `/contas/:numeroConta/usuario`

Esse endpoint deverá atualizar apenas os dados do usuário de uma conta bancária.

- **Requisição** - O corpo (body) deverá possuir um objeto com todas as seguintes propriedades (respeitando estes nomes):

  - nome
  - cpf
  - data_nascimento
  - telefone
  - email
  - senha

#### Exemplo de Requisição

```javascript
// PUT /contas/:numeroConta/usuario
{
    "nome": "Joao",
    "cpf": "22211133344",
    "data_nascimento": "2020-10-20",
    "telefone": "81987654321",
    "email": "joao@gmail.com",
    "senha": 1234
{
```

### ❌ Excluir Conta

#### `DELETE` `/contas/:numeroConta`

Esse endpoint deve excluir uma conta bancária existente.

- **Requisição**

  - Numero da conta bancária (passado como parâmetro na rota)

### 💰 Depositar

#### `POST` `/transacoes/depositar`

Esse endpoint deverá somar o valor do depósito ao saldo de uma conta válida e registrar essa transação.

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor

#### Exemplo de Requisição

```javascript
// POST /transacoes/depositar
{
 "numero_conta": "1",
 "valor": 1900
}
```

### 💸 Sacar

#### `POST` `/transacoes/sacar`

Esse endpoint deverá realizar o saque de um valor em uma determinada conta bancária e registrar essa transação.

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta
  - valor
  - senha

#### Exemplo de Requisição

```javascript
// POST /transacoes/sacar
{
  "numero_conta": "1",
  "valor": 1900,
  "senha": 1234
}
```

### ↔️ Tranferir

#### `POST` `/transacoes/transferir`

Esse endpoint deverá permitir a transferência de recursos (dinheiro) de uma conta bancária para outra e registrar essa transação.

- **Requisição** - O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):

  - numero_conta_origem
  - numero_conta_destino
  - valor
  - senha

#### Exemplo de Requisição

```javascript
// POST /transacoes/transferir
{
 "numero_conta_origem": "1",
 "numero_conta_destino": "2",
 "valor": 200,
 "senha": "1234"
}
```

### 📊 Saldo

#### `GET` `/contas/saldo?numero_conta=123&senha=123`

Esse endpoint deverá retornar o saldo de uma conta bancária.

- **Requisição** - query params

  - numero_conta
  - senha

### 📝 Extrato

#### `GET` `/contas/extrato?numero_conta=123&senha=123`

Esse endpoint deverá listar as transações realizadas de uma conta específica.

- **Requisição** - query params

  - numero_conta
  - senha

---

## 🧙‍♂️ Contato

[![Linkedin](https://img.shields.io/badge/LinkedIn-2E2E2E?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/felipe-cordeiro-2a3285286/)

###### tags: `back-end` `nodeJS` `API REST` `desafio` `Javascript`

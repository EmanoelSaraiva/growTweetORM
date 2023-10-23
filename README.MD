# API GrowTwitter

## Visão Geral

A API GrowTwitter é uma plataforma poderosa que combina tecnologias de ponta para criar uma experiência excepcional de mídia social. Ela foi construída com as mais recentes tecnologias, incluindo **Node.js**, **Prisma**, **Bcrypt** e **PostgreSQL**, oferecendo recursos avançados de autenticação de usuário, gerenciamento de tweets, likes, retweets, seguidores e muito mais.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Utilização](#utilização)
- [Rotas da API](#rotas-da-api)
- [Dependências](#dependências)
- [Dependências de Desenvolvimento](#dependências-de-desenvolvimento)
- [Licença](#licença)
- [Autor](#autor)

## Instalação

Siga estes passos para configurar o projeto em sua máquina local:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/api-growtweet.git
   cd api-growtweet
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o banco de dados:

   Crie um arquivo `.env` na raiz do projeto e configure a conexão com o banco de dados **PostgreSQL**:

   ```
   DATABASE_URL=postgresql://seu-usuario:sua-senha@localhost:5432/seu-banco-de-dados
   ```

4. Crie o esquema do banco de dados e insira dados iniciais:

   ```bash
   npx prisma db push
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## Configuração

A API utiliza variáveis de ambiente para configurações. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de acordo com suas necessidades.

Exemplo de arquivo `.env`:

```
DATABASE_URL=postgresql://seu-usuario:sua-senha@localhost:5432/seu-banco-de-dados
```

## Utilização

Esta seção descreve como utilizar a API GrowTweet. Certifique-se de ter seguido os passos de instalação e configuração antes de continuar.

### Autenticação de Usuário

- Para realizar o login de um usuário, faça uma requisição POST para `/auth/login`.
- Para fazer logout, acesse `/auth/logout`.

### Likes

- Para listar todos os likes, acesse `/like`.
- Para criar um novo like, faça uma requisição POST para `/like`.
- Para excluir um like, acesse `/like/:id`.

### Retweets

- Para listar todos os retweets, acesse `/retweet`.
- Para criar um novo retweet, faça uma requisição POST para `/retweet`.
- Para atualizar um retweet existente, acesse `/retweet/:id`.
- Para excluir um retweet, acesse `/retweet/:id`.

### Seguidores

- Para listar todos os seguidores, acesse `/follow`.
- Para seguir um usuário, faça uma requisição POST para `/follow`.
- Para deixar de seguir um usuário, acesse `/follow/:id`.

### Tweets

- Para listar todos os tweets, acesse `/tweet`.
- Para criar um novo tweet, faça uma requisição POST para `/tweet/create`.
- Para atualizar um tweet existente, acesse `/tweet`.
- Para excluir um tweet, acesse `/tweets/:id`.

### Usuários

- Para criar um usuário, faça uma requisição POST para `/user/create`.
- Para listar todos os usuários, acesse `/user`.
- Para atualizar um usuário, faça uma requisição PUT para `/user/:id`.
- Para excluir um usuário, acesse `/user/:id`.

## Rotas da API

A API GrowTweet segue as melhores práticas de organização de código com base na arquitetura Modelo-Controlador-Transferência de Dados-Serviço-Rota. Abaixo estão as principais rotas da API e suas responsabilidades:

- `/models`: Os modelos definem a estrutura dos objetos de dados, como usuário, tweet, like, retweet, etc.

- `/controllers`: Os controladores tratam as solicitações HTTP, conectando-se aos serviços e retornando respostas adequadas.

- `/dtos`: Os objetos de transferência de dados (DTOs) são usados para validar e transferir dados entre o cliente e o servidor de forma segura.

- `/services`: Os serviços contêm a lógica de negócios da aplicação e interagem com os modelos e controladores.

- `/routes`: As rotas definem as URLs da API e encaminham as solicitações HTTP aos controladores apropriados.

## Dependências

A API GrowTweet utiliza as seguintes dependências:

- **Node.js** v14.17.6
- **Prisma** v5.4.2
- **Bcrypt** v5.1.1
- **PostgreSQL** v14.1
- **Express** v4.18.2
- **UUID** v9.0.1

## Dependências de Desenvolvimento

As dependências de desenvolvimento incluem:

- **TypeScript** v5.2.2
- **@types/cors** v2.8.14
- **@types/express** v4.17.18
- **@types/node** v20.7.0
- **@types/uuid** v9.0.4
- **ts-node-dev** v2.0.0

## Licença

Este projeto é licenciado sob a Licença ISC. Consulte o arquivo LICENSE.md para obter mais detalhes.

## Autor

Este projeto foi desenvolvido por Emanoel Saraiva da Silva

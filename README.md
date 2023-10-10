<div align="center">
  <h1>Api - FutebolClub</h1>
</div>
---

### Documentação da API 📖

| Método      | Endpoint                 | Descrição       | Requer Autenticação |
| ----------- | ------------------------ | ----------------- | -------------------- |
| POST    | /login | valida o login e retorna o token | Não          |
| GET   | /login/role         | retorna o tipo de função do usuário | Sim      |
| GET    | /teams             | retorna a tabela de times | Não |
| GET | /teams/:id           | retorna o time pelo id  | Não |
| GET   | /matches           | retorna a tabela de partidas | Não |
| PATCH  | /matches/:id/finish | finaliza a partida  | Sim |
| PATCH  | /matches/:id               | atualiza os gols da partida   | Sim |
| POST  | /matches               | cria uma nova partida   | Sim |
| GET   | /leaderboard         | retorna infos de classificação de todas as partidas finalizadas | Não     |
| GET   | /leaderboard/home         | retorna infos de classificação de times da casa | Não   |
| GET   | /leaderboard/away         | retorna infos de classificação de times de fora | Não    |

---
## Descrição

Projeto full stack de um site de futebol com lógica de classificações entre times e partidas, contém front end mas só desenvolvi o back end em específico.
O backend foi desenvolvido utilizando o paradigma de programação orientada a objetos com arquitetura em camadas e fundamentos de SOLID.
Utilizei JWT para criar token de autenticação e o bcrypt para encriptografar senhas de login no banco de dados.

## Testes
Para os testes de integração foram utilizados os frameworks Mocha, Chai, Sinon e Chai-http. Para executar os testes, no diretório backend você poderá executar o seguinte comando:
`npm test`

## ORM
O uso do ORM Sequelize simplifica a interação com bancos de dados relacionais de forma mais segura e performática, abstraindo a complexidade do SQL em aplicativos Node.js.

## 💻 Tecnologias usadas

  * NodeJS
    
  * Express
    
  * Sequelize

  * Nodemon

  * TypeScript

  * MYSQL

  * Docker
    
  * Mocha
    
  * Chai
    
  * Sinon
    
  * bcrypt
    
  * JWT


## 🐋 Rodando o projeto com Docker
Para rodar o projeto utilizando docker, no diretório da aplicação execute o comando:

`docker-compose up -d`
ou
`npm run compose:up`

Para acompanhar os logs do container do servidor backend, com nodemon já em execução:

`docker logs -n 90 -f app_backend`
ou
`npm run logs backend`

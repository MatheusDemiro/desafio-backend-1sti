<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Projeto desenvolvido para o desafio backend Pleno da empresa 1STi. Para mais informações a respeito do desafio acesse [link](https://docs.google.com/document/d/1OGZJjt39u8cTwTO59H4_-SLockmTImbzBhpaKKoaouE/edit).

Para o desafio foi solicitado cachear a rota de busca por CEP. O armazenamento de cache poderia ser ou via banco de dados em uma tabela à parte ou via banco em memória. Para este projeto foi utilizado uma tabela ("addresses") do banco de dados MySQL para armazenar o cache. Como as informações do CEP é algo que raramente sofrem modificações, foi utilizado um intervalo de 72 horas (variável de ambiente "CACHE_VALIDATION") para a expiração de cache.

## Executar projeto no Visual Studio Code
###### 1. Instalar dependências
#
```bash
$ npm install
```

###### 2. Executar migrations
#
```bash
$ npm run typeorm migration:run
```

###### 3. Executar aplicação
#
```bash
$ npm run start:local
```

## Executar projeto no docker
###### 1. Criar network
#
```bash
$ docker network create desafio-1sti-network
```
###### 2. Criar imagem do banco de dados MySQL
#
```bash
$ docker build -t mysql-desafio-1sti --file Dockerfile.mysql .
```
###### 3. Criar imagem da API
#
```bash
$ docker build -t api-desafio-1sti --file Dockerfile.api .
```

###### 4. Executar container do banco de dados
#
```bash
$ docker run --name mysql-container -d --network desafio-1sti-network --network-alias mysql -d -v /var/lib/mysql -p 3307:3307 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=desafio_1sti mysql-desafio-1sti
```

###### 5. Executar container da API
#
```bash
$ docker run --env-file .env.development --name api-container -d --network desafio-1sti-network -d -p 3000:3000 api-desafio-1sti
```

## Documentação da API
Link para documentação das rotas da API: https://documenter.getpostman.com/view/5779124/UVeAvp5x.

## Requisitos
- Recuperar usuário por CPF - :heavy_check_mark:
- Listagem de usuários - :heavy_check_mark:
- Criar novo usuário - :heavy_check_mark:
- Editar usuário - :heavy_check_mark:
- Remover usuário - :heavy_check_mark:
- Recuperar endereço por CEP (que buscará no endpoint https://viacep.com.br) - :heavy_check_mark:
- Cache da busca por CEP - :heavy_check_mark:
- Utilizar Typescript NodeJS para desenvolver o projeto, de preferência utilizando o framework NestJS - :heavy_check_mark:
- Utilizar um banco de dados relacional(MySQL ou PostgreSQL) - :heavy_check_mark:
- Criar testes unitários simulando cenários com sucesso e com falhas - :x:
- Criar um Dockerfile para que possa rodar em algum container (ex: kubernetes) - :heavy_check_mark:
- Criar um README com as instruções para rodar o projeto - :heavy_check_mark:

## Requisitos bônus
- Aplicar algum design pattern no código - :heavy_check_mark:
- Colocar validação de token JWT - :x:


## Contato

- Author - Matheus Demiro
- E-mail - mpdemiro@hotmail.com
- Linkedin - [matheus-demiro](https://www.linkedin.com/in/matheus-demiro-887348165/)

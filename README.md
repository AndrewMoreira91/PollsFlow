# PollsFlow

Este projeto foi criado durante as aulas da NLW Expert da Rocketseat na trilha de NodeJs.

## Descrição

PollsFlow é uma API de enquetes desenvolvida em Node.js, utilizando o framework Fastify. A API oferece funcionalidades para criar enquetes, adicionar opções de voto, realizar votação em tempo real e coletar resultados instantaneamente.

A comunicação em tempo real é habilitada por meio do uso de WebSockets do Fastify, permitindo que os usuários vejam os resultados das enquetes à medida que os votos são computados.

Para a persistência de dados, a API utiliza o Prisma Client, interagindo com um banco de dados PostgreSQL. Além disso, faz uso do ioredis e Redis para gerenciar as atualizações em tempo real dos votos.

## Tecnologias

- Node.js
- Fastify
- Fastify WebSockets
- Prisma Client
- PostgreSQL
- ioredis
- Redis
- TypeScript
- Zod (para validação de dados)

## Funcionalidades

- Criação de enquetes
- Adição de opções de voto
- Votação em tempo real
- Coleta de resultados em tempo real


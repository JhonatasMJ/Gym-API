import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

export const app = fastify()
// docker ps -a - lista todos os containers
// docker start (id) ou (nome) - inicia o container
// docker rm (id) ou (nome) - remove o container
// npx prisma migrate dev - cria as migrations com base no schema.prisma
// npx prisma studio - abre o prisma studio para visualizar as tabelas e os dados
// docker compose up -d - inicia o container do Postgres com o Docker Compose

const prisma = new PrismaClient()
prisma.user.create({
  data: {
    email: 'teste@teste.com',
    name: 'Teste',
  },
})

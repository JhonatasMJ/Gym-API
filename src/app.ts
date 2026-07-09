import fastify from 'fastify'
import { prisma } from './lib/prisma'
import { registerBodySchema } from './schemas/register.schema'

export const app = fastify()
// docker ps -a - lista todos os containers
// docker start (id) ou (nome) - inicia o container
// docker rm (id) ou (nome) - remove o container
// npx prisma migrate dev - cria as migrations com base no schema.prisma
// npx prisma studio - abre o prisma studio para visualizar as tabelas e os dados
// docker compose up -d - inicia o container do Postgres com o Docker Compose

app.post('/users', async (request, reply) => {
  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })
  return reply.status(201).send()
})

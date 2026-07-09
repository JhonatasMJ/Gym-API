import { prisma } from '@/lib/prisma'
import { registerBodySchema } from '@/schemas/register.schema'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { hash } from 'bcryptjs'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  // 6 é o numero de saltos para gerar o hash
  const password_hash = await hash(password, 6)

  // verifica se o email já está cadastrado
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    return reply.status(409).send({
      message: 'User already exists',
    })
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
  return reply.status(201).send()
}

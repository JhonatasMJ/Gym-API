import { prisma } from '@/lib/prisma'
import { registerBodySchema } from '@/schemas/register.schema'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })
  return reply.status(201).send()
}

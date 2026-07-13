import { registerBodySchema } from '@/schemas/register.schema'
import { registerUseCase } from '@/services/register'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({ name, email, password })
  } catch (error) {
    return reply.status(409).send({
      message: 'User already exists',
    })
  }

  return reply.status(201).send()
}

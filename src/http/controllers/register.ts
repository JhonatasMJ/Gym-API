import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { registerBodySchema } from '@/schemas/register.schema'
import { RegisterUseCase } from '@/services/register'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const UsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    return reply.status(409).send({
      message: 'User already exists',
    })
  }

  return reply.status(201).send()
}

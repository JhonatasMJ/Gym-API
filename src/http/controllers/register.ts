import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { registerBodySchema } from '@/schemas/register.schema'
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists'
import { RegisterUseCase } from '@/services/register'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const UsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(UsersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}

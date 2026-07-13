import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  // 6 é o numero de saltos para gerar o hash
  const password_hash = await hash(password, 6)

  // verifica se o email já está cadastrado
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists')
  }

  // Cria o usuário no banco de dados, usando o repositório prisma
  const prismaUsersRepository = new PrismaUsersRepository()
  await prismaUsersRepository.create({
    name,
    email,
    password_hash,
  })
}

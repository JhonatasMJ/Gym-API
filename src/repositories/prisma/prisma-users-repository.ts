import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
// Repository pattern é um padrão de projeto que separa a lógica de negócios da lógica de acesso a dados.
// O Prisma.UserCreateInput é o tipo de dados que o prisma espera para criar um usuário, ele é gerado automaticamente pelo prisma.
// Implementa a interface UsersRepository para garantir que a classe implemente o método create.
export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    // verifica se o email já está cadastrado
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

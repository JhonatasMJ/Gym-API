import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
// Repository pattern é um padrão de projeto que separa a lógica de negócios da lógica de acesso a dados.
// O Prisma.UserCreateInput é o tipo de dados que o prisma espera para criar um usuário, ele é gerado automaticamente pelo prisma.
export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}

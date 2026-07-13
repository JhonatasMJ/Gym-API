import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'


interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: any) {
 
  }
  async execute({ name, email, password }: RegisterUseCaseRequest) {
    // 6 é o numero de saltos para gerar o hash
    const password_hash = await hash(password, 6)

    // verifica se o email já está cadastrado
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

// Repositório em memória para testes unitários

export class InMemoryUsersRepository implements UsersRepository {
  // Lista de usuários em memória
  public items: User[] = []

  // Busca um usuário pelo email
  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    // Se o usuário não for encontrado, retorna null
    if (!user) {
      return null
    }

    // Se o usuário for encontrado, retorna o usuário
    return user
  }

  // Cria um usuário
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}

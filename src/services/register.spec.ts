import { compare } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'

// Teste unitário para verificar se a senha do usuário é hashed corretamente, não utiliza o banco de dados

describe('Register Service', () => {
  // A senha do usuário deve ser hashed
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },

      // Crio um usuário fake, não utiliza o banco de dados
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

    // Crio um usuário
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    // Verifico se a senha do usuário foi hashed corretamente
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    // Verifico se a senha do usuário foi hashed corretamente
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})

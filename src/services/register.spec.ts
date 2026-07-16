import { compare } from 'bcryptjs'
import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

// Teste unitário para verificar se a senha do usuário é hashed corretamente, não utiliza o banco de dados

describe('Register Service', () => {
  // Deve ser possível registrar um usuário
  it('should be able to register', async () => {
    // Crio um repositório em memória para testes unitários
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    // Crio um usuário
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    // Eu espero que o id do usuário seja uma string
    expect(user.id).toEqual(expect.any(String))
  })

  // A senha do usuário deve ser hashed
  it('should hash user password upon registration', async () => {
    // Crio um repositório em memória para testes unitários
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

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

  // Não deve ser possível registrar um usuário com o mesmo email duas vezes
  it('should not be able to register with same email twice', async () => {
    // Crio um repositório em memória para testes unitários
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const email = 'john.doe@example.com'

    // Crio um usuário
    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    // Eu espero que o método execute lance um erro do tipo UserAlreadyExistsError
    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})

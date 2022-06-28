import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return await Promise.resolve('hashed_password')
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should return hashed password on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('valid_password')
    expect(hash).toBe('hashed_password')
  })
})

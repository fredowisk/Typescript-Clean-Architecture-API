import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return await Promise.resolve('hashed_password')
  }
}))
const salt = 12
const sut = new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should return hashed password on success', async () => {
    const hash = await sut.encrypt('valid_password')
    expect(hash).toBe('hashed_password')
  })

  test('Should throw an Error if Bcrypt throws an Error', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => {
        throw new Error()
      })
    const promise = sut.encrypt('valid_password')
    await expect(promise).rejects.toThrow()
  })
})

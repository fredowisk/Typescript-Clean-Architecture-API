import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return await Promise.resolve('hashed_password')
  },

  compare: async (): Promise<boolean> => {
    return await Promise.resolve(true)
  }
}))
const salt = 12
const sut = new BcryptAdapter(salt)

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('valid_password')
    expect(hashSpy).toHaveBeenCalledWith('valid_password', salt)
  })

  test('Should return hashed password on success', async () => {
    const hash = await sut.hash('valid_password')
    expect(hash).toBe('hashed_password')
  })

  test('Should throw an Error if Bcrypt throws an Error', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => {
        throw new Error()
      })
    const promise = sut.hash('valid_password')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('valid_password', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('valid_password', 'any_hash')
  })

  test('Should return true when compare succeeds', async () => {
    const isEqual = await sut.compare('valid_password', 'any_hash')
    expect(isEqual).toBeTruthy()
  })
})

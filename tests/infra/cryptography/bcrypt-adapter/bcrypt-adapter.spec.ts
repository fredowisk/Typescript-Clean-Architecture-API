import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return Promise.resolve('hashed_password')
  },

  compare: async (): Promise<boolean> => {
    return Promise.resolve(true)
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

  test('Should throw an Error if Bcrypt hash throws an Error', async () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
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

  test('Should return false when compare fails', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
      return Promise.resolve(false)
    })
    const isEqual = await sut.compare('valid_password', 'any_hash')
    expect(isEqual).toBeFalsy()
  })

  test('Should return false when compare fails', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(async () => {
      return Promise.resolve(false)
    })
    const isEqual = await sut.compare('valid_password', 'any_hash')
    expect(isEqual).toBeFalsy()
  })

  test('Should throw an Error if Bcrypt compare throws an Error', async () => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
      throw new Error()
    })
    const promise = sut.compare('valid_password', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})

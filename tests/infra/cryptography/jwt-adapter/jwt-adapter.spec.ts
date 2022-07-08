import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('token')
  },

  async verify (): Promise<string> {
    return Promise.resolve('any_value')
  }
}))

describe('Jwt Adapter', () => {
  const sut = new JwtAdapter(env.jwtSecret)
  const id = 'any_id'
  const token = 'any_token'

  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(id)

      expect(signSpy).toHaveBeenCalledWith({ id }, env.jwtSecret)
    })

    test('Should return a token if sign succeeds', async () => {
      const accessToken = await sut.encrypt(id)

      expect(accessToken).toBe('token')
    })

    test('Should throw an Error if sign fails', async () => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        throw new Error()
      })
      const promise = sut.encrypt(id)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values ', async () => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(token)

      expect(verifySpy).toHaveBeenCalledWith(token, env.jwtSecret)
    })
  })
})

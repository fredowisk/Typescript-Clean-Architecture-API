import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('token')
  }
}))

describe('Jwt Adapter', () => {
  const sut = new JwtAdapter('secret')

  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')

      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token if sign succeeds', async () => {
      const accessToken = await sut.encrypt('any_id')

      expect(accessToken).toBe('token')
    })

    test('Should throw an Error if sign fails', async () => {
      jest.spyOn(jwt, 'sign').mockImplementation(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')

      await expect(promise).rejects.toThrow()
    })
  })
})

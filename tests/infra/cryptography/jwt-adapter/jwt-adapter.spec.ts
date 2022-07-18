import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

jest.mock('jsonwebtoken', () => ({
  sign (): string {
    return 'token'
  },

  verify (): string {
    return 'any_value'
  }
}))

describe('Jwt Adapter', () => {
  const sut = new JwtAdapter(env.jwtSecret)
  const id = 'any_id'
  const token = 'any_token'

  describe('sign()', () => {
    test('Should call sign with correct values', () => {
      const signSpy = jest.spyOn(jwt, 'sign')
      sut.encrypt(id)

      expect(signSpy).toHaveBeenCalledWith({ id }, env.jwtSecret)
    })

    test('Should return a token if sign succeeds', () => {
      const accessToken = sut.encrypt(id)

      expect(accessToken).toBe('token')
    })

    test('Should throw an Error if sign fails', () => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      expect(() => sut.encrypt(id)).toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call verify with correct values', () => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      sut.decrypt(token)

      expect(verifySpy).toHaveBeenCalledWith(token, env.jwtSecret)
    })

    test('Should return null if verify fails', () => {
      jest.spyOn(jwt, 'verify').mockReturnValueOnce(null)
      const decryptedToken = sut.decrypt(token)

      expect(decryptedToken).toBeNull()
    })

    test('Should return a value if verify succeeds', () => {
      const decryptedToken = sut.decrypt(token)

      expect(decryptedToken).toBe('any_value')
    })

    test('Should throw an Error if verify throws an Error', () => {
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error()
      })

      expect(() => sut.decrypt(token)).toThrow()
    })
  })
})

import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('token')
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sing with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token if sign succeeds', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id')

    expect(accessToken).toBe('token')
  })
})

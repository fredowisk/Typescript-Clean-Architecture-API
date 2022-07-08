import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbLoadAccountByToken } from '@/data/usecases/load-account/db-load-account-by-token'

describe('DbLoadAccountByToken Use case', () => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_value')
    }
  }

  const decrypterStub = new DecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)

  const accessToken = 'access_token'
  const role = 'any_role'

  test('Should call Decrypter with correct value', async () => {
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(accessToken, role)

    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })

  test('Should return null if Decrypter return null', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(Promise.resolve(null))

    const account = await sut.load(accessToken, role)

    expect(account).toBeNull()
  })
})

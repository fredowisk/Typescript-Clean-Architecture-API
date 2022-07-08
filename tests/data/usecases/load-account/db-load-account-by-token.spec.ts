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

  test('Should call Decrypter with correct value', async () => {
    const accessToken = 'access_token'
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load(accessToken)

    expect(decryptSpy).toHaveBeenCalledWith(accessToken)
  })
})

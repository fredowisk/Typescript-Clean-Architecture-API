import { DbAddAccount } from '../../../../src/data/usecases/add-account/db-add-account'

class EncrypterStub {
  async encrypt (password: string): Promise<string> {
    return await Promise.resolve('hashed_password')
  }
}
const encrypterStub = new EncrypterStub()
const sut = new DbAddAccount(encrypterStub)

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})

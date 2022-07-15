import { Encrypter } from '@/data/protocols/cryptography/encrypter'

const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt (id: string): string {
      return 'hashed_id'
    }
  }

  return new EncrypterStub()
}

export { mockEncrypter }

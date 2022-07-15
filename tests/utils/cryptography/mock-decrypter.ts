import { Decrypter } from '@/data/protocols/cryptography/decrypter'

const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    decrypt (value: string): string {
      return 'any_value'
    }
  }

  return new DecrypterStub()
}

export { mockDecrypter }

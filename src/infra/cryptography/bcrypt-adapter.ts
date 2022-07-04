import bcrypt from 'bcrypt'
import { Encrypter } from '@/data/protocols/criptography/encrypter'

class BcryptAdapter implements Encrypter {
  constructor (readonly salt: number) {
  }

  async encrypt (password: string): Promise<string> {
    return await Promise.resolve(bcrypt.hash(password, this.salt))
  }
}

export { BcryptAdapter }

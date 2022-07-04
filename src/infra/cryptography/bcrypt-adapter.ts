import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'

class BcryptAdapter implements Hasher {
  constructor (readonly salt: number) {
  }

  async hash (password: string): Promise<string> {
    return await Promise.resolve(bcrypt.hash(password, this.salt))
  }
}

export { BcryptAdapter }

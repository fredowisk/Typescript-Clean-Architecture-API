import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/criptography/hasher'
import { HashComparer } from '@/data/protocols/criptography/hash-comparer'

class BcryptAdapter implements Hasher, HashComparer {
  constructor (readonly salt: number) {
  }

  async hash (password: string): Promise<string> {
    return Promise.resolve(bcrypt.hash(password, this.salt))
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)

    return Promise.resolve(isEqual)
  }
}

export { BcryptAdapter }

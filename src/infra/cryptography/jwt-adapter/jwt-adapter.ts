import jwt from 'jsonwebtoken'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (accessToken: string): Promise<string> {
    jwt.verify(accessToken, this.secret)
    return Promise.resolve(null)
  }
}

export { JwtAdapter }

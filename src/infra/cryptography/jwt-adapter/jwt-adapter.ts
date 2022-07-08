import jwt from 'jsonwebtoken'
import { Encrypter } from '@/data/protocols/criptography/encrypter'
import { Decrypter } from '@/data/protocols/criptography/decrypter'

class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  encrypt (value: string): string {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  decrypt (accessToken: string): string {
    const value: any = jwt.verify(accessToken, this.secret)

    if (!value) return null

    return value
  }
}

export { JwtAdapter }

import { Hasher } from '@/data/protocols/cryptography/hasher'

const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (password: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }

  return new HasherStub()
}

export { mockHasher }

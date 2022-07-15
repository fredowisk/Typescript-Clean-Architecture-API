import { HashComparer } from '@/data/protocols/cryptography/hash-comparer'

const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }

  return new HashComparerStub()
}

export { mockHashComparer }

import { Collection, MongoClient } from 'mongodb'

const MongoHelper = {
  client: MongoClient,
  async connect (): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL ?? 'test')
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  async clear (name: string): Promise<void> {
    await this.getCollection(name).deleteMany({})
  }
}

export { MongoHelper }

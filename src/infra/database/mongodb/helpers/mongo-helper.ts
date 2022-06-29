import { Collection, MongoClient } from 'mongodb'

const MongoHelper = {
  client: MongoClient,
  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
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

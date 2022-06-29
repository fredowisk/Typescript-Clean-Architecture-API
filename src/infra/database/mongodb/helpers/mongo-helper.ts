import { Collection, MongoClient } from 'mongodb'

const MongoHelper = {
  client: MongoClient,
  uri: null as string,
  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.uri)
    return this.client.db().collection(name)
  },

  async clear (name: string): Promise<void> {
    const collection = await this.getCollection(name)
    collection.deleteMany({})
  }
}

export { MongoHelper }

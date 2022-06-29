import { MongoClient } from 'mongodb'

const MongoHelper = {
  client: null as unknown as MongoClient,
  async connect (): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL ?? 'test')
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}

export { MongoHelper }

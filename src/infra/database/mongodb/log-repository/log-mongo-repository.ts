import { LogErrorRepository } from '@/data/protocols/db/log-repository/log-error-repository'
import { MongoHelper } from '../helpers/mongo-helper'

class ErrorMongoRepository implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    const logCollection = await MongoHelper.getCollection('logs')
    await logCollection.insertOne({ stack, date: new Date() })
  }
}

export { ErrorMongoRepository }

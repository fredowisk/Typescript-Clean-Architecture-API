import { AddAccountModel } from '@/application/usecases/add-account/add-account-model'
import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { MongoHelper } from '../helpers/mongo-helper'

class AccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<void> {
    const accountData = { ...account }
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)
  };
}

export { AccountMongoRepository }

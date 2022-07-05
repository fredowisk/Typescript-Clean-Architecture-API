import { AddAccountModel } from '@/application/usecases/add-account/add-account-model'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (account: AddAccountModel): Promise<void> {
    const accountData = { ...account }
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(accountData)
  };

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map(account)
  }
}

export { AccountMongoRepository }

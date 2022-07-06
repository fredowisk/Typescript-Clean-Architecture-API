import { AddAccountModel } from '@/application/usecases/add-account/add-account-model'
import { AddAccountRepository } from '@/data/protocols/db/account-repository/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account-repository/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account-repository/update-access-token-repository'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'

class AccountMongoRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {
  async add (account: AddAccountModel): Promise<void> {
    const accountData = { ...account }
    const accountCollection = await MongoHelper.getCollection('accounts')
    const newAccount = await accountCollection.insertOne(accountData)
    if (!newAccount) return null
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (token: string, id: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}

export { AccountMongoRepository }

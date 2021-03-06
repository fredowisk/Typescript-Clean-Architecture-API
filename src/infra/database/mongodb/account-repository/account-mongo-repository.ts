import { AddAccountParams } from '@/application/usecases/account/add-account/add-account-model'
import { AddAccountRepository } from '@/data/protocols/db/account-repository/add-account-repository'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account-repository/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account-repository/update-access-token-repository'
import { LoadAccountByTokenRepository } from '@/data/usecases/account/load-account/db-load-account-by-token-protocols'
import { AccountModel } from '@/domain/models/account/account'
import { MongoHelper } from '../helpers/mongo-helper'

class AccountMongoRepository
implements
    AddAccountRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository,
    LoadAccountByTokenRepository {
  async add (account: AddAccountParams): Promise<void> {
    const accountData = { ...account }
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { acknowledged } = await accountCollection.insertOne(accountData)

    if (!acknowledged) return null
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({ email })
    return account && MongoHelper.map<AccountModel>(account)
  }

  async loadByToken (accessToken: string, role?: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<AccountModel>({
      accessToken,
      $or: [
        {
          role
        },
        {
          role: 'admin'
        }
      ]
    })

    return account && MongoHelper.map<AccountModel>(account)
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

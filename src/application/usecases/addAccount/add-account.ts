import {
  AccountModel,
  AddAccountModel
} from '../../../presentation/controllers/signup/signup-protocols'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}

export { AddAccount }

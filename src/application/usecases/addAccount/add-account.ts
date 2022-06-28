import {
  AccountModel,
  AddAccountModel
} from '../../../presentation/controllers/signup/signup-protocols'

interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}

export { AddAccount }

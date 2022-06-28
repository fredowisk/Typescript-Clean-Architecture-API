import AccountModel from '../../../domain/models/account'
import AddAccountModel from './addAccountModel'

interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}

export default AddAccount

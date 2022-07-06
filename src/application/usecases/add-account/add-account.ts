import {
  AddAccountModel
} from '@/presentation/controllers/account/signup/signup-controller-protocols'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<void>
}

export { AddAccount }

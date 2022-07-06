import {
  AddAccountModel
} from '@/presentation/controllers/signup/signup-controller-protocols'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<void>
}

export { AddAccount }

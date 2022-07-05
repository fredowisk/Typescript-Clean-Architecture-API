import {
  AddAccountModel
} from '@/presentation/controllers/signup/signup-protocols-controller'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<void>
}

export { AddAccount }

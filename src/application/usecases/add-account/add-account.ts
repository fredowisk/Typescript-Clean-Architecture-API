import {
  AddAccountModel
} from '@/presentation/controllers/signup/signup-protocols'

interface AddAccount {
  add: (account: AddAccountModel) => Promise<void>
}

export { AddAccount }

import {
  AddAccountParams
} from '@/presentation/controllers/account/signup/signup-controller-protocols'

interface AddAccount {
  add: (account: AddAccountParams) => Promise<void>
}

export { AddAccount }

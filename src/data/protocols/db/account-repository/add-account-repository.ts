import { AddAccountParams } from '@/application/usecases/account/add-account/add-account-model'

interface AddAccountRepository {
  add: (account: AddAccountParams) => Promise<void>
}

export { AddAccountRepository }

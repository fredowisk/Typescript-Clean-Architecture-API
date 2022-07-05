import { AddAccountModel } from '@/application/usecases/add-account/add-account-model'

interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<void>
}

export { AddAccountRepository }

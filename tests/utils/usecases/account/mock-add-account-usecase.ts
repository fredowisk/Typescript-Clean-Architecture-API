import {
  AddAccount,
  AddAccountParams
} from '@/presentation/controllers/account/signup/signup-controller-protocols'

const mockAddAccountUseCase = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<void> {

    }
  }

  return new AddAccountStub()
}

export { mockAddAccountUseCase }

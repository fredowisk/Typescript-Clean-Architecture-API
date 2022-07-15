import { AddAccountParams } from '@/application/usecases/account/add-account/add-account-model'
import { AccountModel } from '@/domain/models/account/account'

const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const mockAddAccountParams = (role?: string): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  role
})

const mockRealAccount = (): AddAccountParams => ({
  name: 'Fred',
  email: 'fred@gmail.com',
  password: '123',
  passwordConfirmation: '123'
})

export { mockAccountModel, mockAddAccountParams, mockRealAccount }

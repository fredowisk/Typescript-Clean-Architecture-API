import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log'
import { Controller } from '@/presentation/protocols'
import SignUpController from '@/presentation/controllers/signup/signup'
import { LogControllerDecorator } from '../../decorators/log'
import { signUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const encrypter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(encrypter, addAccountRepository)

  const signUpController = new SignUpController(
    addAccount,
    signUpValidation()
  )
  const logErrorRepository = new ErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}

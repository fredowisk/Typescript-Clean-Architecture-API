import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import SignUpController from '@/presentation/controllers/signup/signup-controller'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { signUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const hasher = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(hasher, addAccountRepository)

  const signUpController = new SignUpController(
    addAccount,
    signUpValidation()
  )
  const logErrorRepository = new ErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}

import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'
import { Controller } from '@/presentation/protocols'
import SignUpController from '@/presentation/controllers/account/signup/signup-controller'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { signUpValidation } from './signup-validation-factory'
import env from '@/main/config/env'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { UserAuthentication } from '@/data/usecases/account/authentication/user-authentication'

export const makeSignUpController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const accountMongoRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const authentication = new UserAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const signUpController = new SignUpController(
    addAccount,
    signUpValidation(),
    authentication
  )

  const logErrorRepository = new ErrorMongoRepository()
  return new LogControllerDecorator(signUpController, logErrorRepository)
}

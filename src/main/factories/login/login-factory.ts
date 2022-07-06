import { UserAuthentication } from '@/data/usecases/authentication/user-authentication'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoginController } from '@/presentation/controllers/account/login/login-controller'
import { Controller } from '@/presentation/protocols/controller'
import { loginValidation } from './login-validation-factory'
import { ErrorMongoRepository } from '@/infra/database/mongodb/log-repository/log-mongo-repository'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/database/mongodb/account-repository/account-mongo-repository'
import env from '@/main/config/env'

export const makeLoginController = (): Controller => {
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(env.salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const authentication = new UserAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )

  const loginController = new LoginController(
    authentication,
    loginValidation()
  )
  const logMongoRepository = new ErrorMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}

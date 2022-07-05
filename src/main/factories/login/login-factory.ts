import { UserAuthentication } from '@/data/usecases/authentication/user-authentication'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols/controller'
import { loginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const loadAccountByEmailRepository = Account
  const hashComparer = new HashComparer()
  const encrypterGenerator = new JwtAdapter('secret')
  const updateAccessTokenRepository = new UpdateAccessTokenRepository()
  const authentication = new UserAuthentication(loadAccountByEmailRepository, hashComparer, encrypterGenerator, updateAccessTokenRepository)

  return new LoginController(authentication, loginValidation())
}

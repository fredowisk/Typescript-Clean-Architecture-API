import { UserAuthentication } from '@/data/usecases/authentication/user-authentication'
import { LoginController } from '@/presentation/controllers/login/login'
import { Controller } from '@/presentation/protocols/controller'
import { loginValidation } from './login-validation'

export const makeLoginController = (): Controller => {
  const loadAccountByEmailRepository = new LoadAccountByEmailRepository()
  const hashComparer = new HashComparer()
  const encrypterGenerator = new EncrypterGenerator()
  const updateAccessTokenRepository = new UpdateAccessTokenRepository()
  const authentication = new UserAuthentication(loadAccountByEmailRepository, hashComparer, encrypterGenerator, updateAccessTokenRepository)

  return new LoginController(authentication, loginValidation())
}

import { UserAuthentication } from '@/data/usecases/authentication/user-authentication'
import { LoginController } from '@/presentation/controllers/login/login'
import { Controller } from '@/presentation/protocols/controller'
import { loginValidation } from './login-validation'

export const makeLoginController = (): Controller => {
  const authentication = new UserAuthentication()

  return new LoginController(authentication, loginValidation())
}

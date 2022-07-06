import SignUpController from '@/presentation/controllers/signup/signup-controller'
import {
  AddAccount,
  AddAccountModel,
  HttpRequest,
  Validation
} from '@/presentation/controllers/signup/signup-protocols-controller'
import { ServerError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { Authentication } from '@/application/usecases/authentication/authentication'
import { AuthenticationModel } from 'application/usecases/authentication/authentication-model'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authenticationStub: Authentication
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<void> {}
  }

  return new AddAccountStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return Promise.resolve('access_token')
    }
  }
  return new AuthenticationStub()
}

const { sut, addAccountStub, validationStub, authenticationStub } = ((): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()

  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
})()

const makeHttpRequest = (property?: string): HttpRequest => {
  const httpRequest: HttpRequest = {
    body: {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      passwordConfirmation: 'any_password'
    }
  }
  if (property) httpRequest.body[property] = undefined

  return httpRequest
}

describe('SignUp Controller', () => {
  test('Should return 500 if AddAccount throws an Error', async () => {
    jest
      .spyOn(addAccountStub, 'add')
      .mockImplementationOnce(async () => await Promise.reject(new Error()))

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should call AddAccount with correct values', async () => {
    const addAccountSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    delete httpRequest.body.passwordConfirmation
    expect(addAccountSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 200 if account is created successfully', async () => {
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({ accessToken: 'access_token' }))
  })

  test('Should call Validation with correct value', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeHttpRequest()

    await sut.handle(httpRequest)
    delete httpRequest.body.passwordConfirmation
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation returns an Error', async () => {
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeHttpRequest()

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    const { email, password } = httpRequest.body
    expect(authSpy).toHaveBeenCalledWith({ email, password })
  })

  test('Should return 500 if Authentication throws an Error', async () => {
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})

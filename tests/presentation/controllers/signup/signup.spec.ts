import SignUpController from '@/presentation/controllers/signup/signup'
import {
  EmailValidator,
  AddAccount,
  AddAccountModel,
  HttpRequest,
  Validation
} from '@/presentation/controllers/signup/signup-protocols'
import {
  MissingParamError,
  InvalidParamError,
  ServerError
} from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError
} from '@/presentation/helpers/http-helper'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
  validationStub: Validation
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
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

const { sut, emailValidatorStub, addAccountStub, validationStub } =
  ((): SutTypes => {
    const emailValidatorStub = makeEmailValidator()
    const addAccountStub = makeAddAccount()
    const validationStub = makeValidation()

    const sut = new SignUpController(
      emailValidatorStub,
      addAccountStub,
      validationStub
    )
    return {
      sut,
      emailValidatorStub,
      addAccountStub,
      validationStub
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
  test('Should return 400 if no name is provided', async () => {
    const httpRequest = makeHttpRequest('name')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 400 if no email is provided', async () => {
    const httpRequest = makeHttpRequest('email')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 400 if no password is provided', async () => {
    const httpRequest = makeHttpRequest('password')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should return 400 if no passwordConfirmation is provided', async () => {
    const httpRequest = makeHttpRequest('passwordConfirmation')
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('passwordConfirmation'))
    )
  })

  test('Should return 400 if passwordConfirmation fails', async () => {
    const httpRequest = makeHttpRequest()
    httpRequest.body.passwordConfirmation = 'different_password'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('passwordConfirmation'))
    )
  })

  test('Should return 400 if an invalid email is provided', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = makeHttpRequest()
    httpRequest.body.email = 'invalid_email@mail.com'
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Should call EmailValidator with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
  })

  test('Should return 500 if EmailValidator throws an Error', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

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
    expect(httpResponse).toEqual(ok())
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
})

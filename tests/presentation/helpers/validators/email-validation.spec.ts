import { EmailValidator } from '@/presentation/controllers/signup/signup-protocols'
import { InvalidParamError } from '@/presentation/errors/invalid-param-error'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'

interface SutTypes {
  sut: EmailValidation
  emailValidatorStub: EmailValidator
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const { sut, emailValidatorStub } = ((): SutTypes => {
  const emailValidatorStub = makeEmailValidator()

  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
})()

const email = 'any_email@mail.com'

describe('SignUp Controller', () => {
  test('Should return an Error if EmailValidator return false', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email })
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should throw an Error if EmailValidator throws an Error', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })
})

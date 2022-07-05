import { loginValidation } from '@/main/factories/login/login-validation-factory'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { EmailValidator } from '@/presentation/protocols/email-validator'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('Login Validation Factory', () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidatorStub = new EmailValidatorStub()

  test('Should call ValidationComposite with all Validations', () => {
    loginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(
      new EmailValidation('email', emailValidatorStub)
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

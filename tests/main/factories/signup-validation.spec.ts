import { signUpValidation } from '@/main/factories/signup-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { CompareFieldsValidation } from '@/presentation/helpers/validators/compare-fields-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all Validations', () => {
    signUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(
      new CompareFieldsValidation('password', 'passwordConfirmation')
    )

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

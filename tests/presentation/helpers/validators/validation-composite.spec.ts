import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

describe('Validation Composite', () => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }

  const validationStub = new ValidationStub()
  test('Should return the same error of validation if validation fails', () => {
    jest
      .spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new InvalidParamError('field'))
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({
      field: 'any_value'
    })

    expect(error).toEqual(new InvalidParamError('field'))
  })
})

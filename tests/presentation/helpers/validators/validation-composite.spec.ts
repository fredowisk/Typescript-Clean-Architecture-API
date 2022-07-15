import { InvalidParamError } from '@/presentation/errors'
import { mockValidation } from '@/tests/utils/index'
import { ValidationComposite } from '@/validation/validators/validation-composite'

describe('Validation Composite', () => {
  const validationStubs = [mockValidation(), mockValidation()]
  const sut = new ValidationComposite(validationStubs)

  test('Should return the same error of validation if validation fails', () => {
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new InvalidParamError('field'))

    const error = sut.validate({
      field: 'any_value'
    })

    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should stop validation and return the first validation error', () => {
    jest
      .spyOn(validationStubs[0], 'validate')
      .mockReturnValueOnce(new Error())
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(null)

    const error = sut.validate({
      field: 'any_value'
    })

    expect(error).toEqual(new Error())
  })

  test('Should not return an Error if validation succeeds', () => {
    const error = sut.validate({
      field: 'any_value'
    })

    expect(error).toBeFalsy()
  })
})

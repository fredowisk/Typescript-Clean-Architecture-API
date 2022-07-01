import { MissingParamError } from '@/presentation/errors/missing-param-error'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'

describe('Required Field Validation', () => {
  const sut = new RequiredFieldValidation('field')

  test('Should return MissingParamError if validation fails', () => {
    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const error = sut.validate({ field: 'any_name' })

    expect(error).toBeFalsy()
  })
})

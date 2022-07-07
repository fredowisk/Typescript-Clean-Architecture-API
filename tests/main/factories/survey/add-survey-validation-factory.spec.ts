import { addSurveyValidation } from '@/main/factories/survey/add-survey/add-survey-validation-factory'
import { Validation } from '@/presentation/controllers/survey/add-survey/add-survey-controller-protocols'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('@/validation/validators/validation-composite')

describe('Add Survey Validation Factory', () => {
  test('Should call ValidationComposite with all Validations', () => {
    addSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})

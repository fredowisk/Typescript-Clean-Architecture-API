import { SurveyModel } from '@/domain/models/survey'

interface LoadSurveyByIdRepository {
  loadById: (id: string) => Promise<SurveyModel>
}

export { LoadSurveyByIdRepository }

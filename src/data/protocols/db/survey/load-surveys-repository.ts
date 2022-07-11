import { SurveyModel } from '@/domain/models/survey'

interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}

export { LoadSurveysRepository }

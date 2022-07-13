import { SurveyModel } from '@/domain/models/survey/survey'

interface LoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}

export { LoadSurveysRepository }

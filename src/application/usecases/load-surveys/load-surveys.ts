import { SurveyModel } from '@/domain/models/survey'

interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}

export { LoadSurveys }

import { SurveyModel } from '@/domain/models/survey/survey'

interface LoadSurveys {
  load: () => Promise<SurveyModel[]>
}

export { LoadSurveys }

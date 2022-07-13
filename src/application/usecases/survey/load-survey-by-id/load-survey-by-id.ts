import { SurveyModel } from '@/domain/models/survey/survey'

interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}

export { LoadSurveyById }

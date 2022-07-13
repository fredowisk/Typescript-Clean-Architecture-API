import { SurveyModel } from '@/domain/models/survey'

interface LoadSurveyById {
  loadById: (id: string) => Promise<SurveyModel>
}

export { LoadSurveyById }

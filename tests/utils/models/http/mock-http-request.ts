import { HttpRequest } from '@/presentation/protocols/http'

const mockHttpRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    name: 'any_name',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const mockSurveyHttpRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }
})

const mockSaveSurveyResultHttpRequest = (): HttpRequest => ({
  accountId: 'any_id',
  params: {
    surveyId: 'any_id'
  },
  body: {
    answer: 'any_answer'
  }
})

export {
  mockHttpRequest,
  mockSurveyHttpRequest,
  mockSaveSurveyResultHttpRequest
}

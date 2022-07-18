import {
  loginPath,
  signUpPath,
  surveyPath,
  surveyResultPath
} from './paths/index'

export default {
  '/login': loginPath,
  '/survey': surveyPath,
  '/signup': signUpPath,
  '/surveys/{surveyId}/results': surveyResultPath
}

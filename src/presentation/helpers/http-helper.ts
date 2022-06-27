class BadRequest {
  statusCode: number
  body: Error

  constructor (error: Error) {
    this.statusCode = 400
    this.body = error
  }
}

export default BadRequest

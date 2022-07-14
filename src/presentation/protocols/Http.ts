interface HttpResponse {
  statusCode: number
  body: any
}

interface HttpRequest {
  params?: any
  body?: any
  headers?: any
}

export { HttpResponse, HttpRequest }

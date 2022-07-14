interface HttpResponse {
  statusCode: number
  body: any
}

interface HttpRequest {
  params?: any
  body?: any
  headers?: any
  accountId?: string
}

export { HttpResponse, HttpRequest }

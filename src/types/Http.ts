export type HttpRequest = {
  body: Record<string, any>
  params: Record<string, any>
  queryParams: Record<string, any>
  file?: Express.Multer.File
}

export type HttpResponse = {
  statusCode: number
  body?: Record<string, any>
}

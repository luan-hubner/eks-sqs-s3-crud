import { HttpRequest, HttpResponse } from '@src/types/Http'

export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

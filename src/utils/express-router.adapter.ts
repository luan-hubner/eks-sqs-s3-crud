import { Controller } from '@src/utils/controller'
import { HttpRequest } from '@src/types/Http'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      queryParams: req.query,
      params: req.params,
      body: req.body,
      file: req.file,
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200 || httpResponse.statusCode === 201) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({ error: httpResponse.body?.message })
    }
  }
}

import { HttpResponse } from '../types/Http'

export const badRequest = (body?: Record<string, any>): HttpResponse => ({
  statusCode: 400,
  body,
})

export const created = (body?: Record<string, any>): HttpResponse => ({
  statusCode: 201,
  body,
})

export const ok = (body?: Record<string, any>): HttpResponse => ({
  statusCode: 200,
  body,
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: { error: 'something went wrong...' },
})

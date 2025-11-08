import { CreateProduct } from '@src/application/use-cases/product/create-product/create-product'
import { productSchema } from '@src/schemas/zod/product'
import { HttpRequest, HttpResponse } from '@src/types/Http'
import { Controller } from '@src/utils/controller'
import { badRequest, created, serverError } from '@src/utils/http'

export class CreateProductController implements Controller {
  constructor(private readonly createProduct: CreateProduct) {}

  async handle({ body, file }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = productSchema.safeParse({
      ...body,
      image: file,
    })

    if (!success) {
      return badRequest({ errors: error.issues })
    }

    try {
      const product = await this.createProduct.execute({
        description: data.description,
        value: data.value,
        status: 'processing',
        image: data.image,
      })

      return created({ product })
    } catch (err) {
      console.error(`error on product creation 🚨`, { err })
      return serverError()
    }
  }
}

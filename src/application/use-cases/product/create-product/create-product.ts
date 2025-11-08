import { z } from 'zod'
import { productSchema } from '@src/schemas/zod/product'
import { productsTable } from '@src/db/schema'
import { db } from '@src/db'
import { S3Service } from '@src/services/aws-s3.service'
import { randomUUID } from 'crypto'
import { SQSService } from '@src/services/aws-sqs.service'

export class CreateProduct {
  constructor() {}

  async execute(data: z.infer<typeof productSchema> & { status: 'processing' | 'processed' }): Promise<Record<string, any>> {
    const [product] = await db
      .insert(productsTable)
      .values({
        description: data.description,
        value: data.value.toFixed(2),
        status: data.status,
        imageUrl: null,
      })
      .returning({ id: productsTable.id })

    S3Service.upload(data.image.buffer, randomUUID(), data.image.mimetype)
      .then((response) => {
        SQSService.publish({ productId: product.id, imageUrl: response })
      })
      .catch((_) => {
        console.warn(`error on [${data.description}] image upload ⚠️`)
      })

    return product
  }
}

import { z } from 'zod'
import { productSchema } from '@src/schemas/zod/product'
import { productsTable } from '@src/db/schema'
import { db } from '@src/db'
import { S3Service } from '@src/services/aws-s3.service'
import { randomUUID } from 'crypto'

export class CreateProduct {
  constructor() {}

  async execute(data: z.infer<typeof productSchema>): Promise<Record<string, any>> {
    const uploadedFile = await S3Service.upload(data.image.buffer, randomUUID(), data.image.mimetype)

    if (!uploadedFile) {
      console.warn(`error on [${data.description}] image upload ⚠️`)
    }

    const [product] = await db
      .insert(productsTable)
      .values({
        description: data.description,
        value: data.value.toFixed(2),
        imageUrl: uploadedFile,
      })
      .returning({ id: productsTable.id })

    return product
  }
}

import { z } from 'zod'
import { productSchema } from '@src/schemas/zod/product'
import { productsTable } from '@src/db/schema'
import { db } from '@src/db'

export class CreateProduct {
  constructor() {}

  async execute(data: z.infer<typeof productSchema>): Promise<Record<string, any>> {
    const [product] = await db
      .insert(productsTable)
      .values({
        description: data.description,
        value: data.value.toFixed(2),
      })
      .returning({ id: productsTable.id })

    return product
  }
}

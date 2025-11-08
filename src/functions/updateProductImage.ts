import { db } from '@src/db'
import { productsTable } from '@src/db/schema'
import { SQSEvent, SQSHandler } from 'aws-lambda'

export const handler: SQSHandler = async (event: SQSEvent) => {
  for (const record of event.Records) {
    const body = JSON.parse(record.body)
    console.log(`image update request received for product: ${body.productId} 📩`)

    try {
      const [product] = await db
        .update(productsTable)
        .set({
          imageUrl: body.imageUrl,
          status: 'processed',
        })
        .returning({ id: productsTable.id })

      console.log(`product ${product.id} has been updated ✅`)
    } catch (error) {
      console.error('error on product image update 🚨')
      throw error
    }
  }
}

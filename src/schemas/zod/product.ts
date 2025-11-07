import z from 'zod'

export const productSchema = z.object({
  description: z.string().min(3),
  value: z.number(),
})

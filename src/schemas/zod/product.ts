import z from 'zod'

export const productSchema = z.object({
  description: z.string().min(3),
  value: z.transform((val: string) => parseFloat(val)).refine((val) => !isNaN(val), 'Provided value is invalid.'),
  image: z
    .custom<Express.Multer.File>()
    .refine((file) => file && file.mimetype, { error: 'Product image is required.' })
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.mimetype), {
      error: 'File format is invalid, only jpeg or png is allowed.',
    }),
})

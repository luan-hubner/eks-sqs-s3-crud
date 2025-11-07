import { createProductController } from '@src/application/use-cases/product/create-product'
import { adaptRoute } from '@src/utils/express-router.adapter'
import { Router } from 'express'

const router = Router()

router.post('/', adaptRoute(createProductController))

export { router }

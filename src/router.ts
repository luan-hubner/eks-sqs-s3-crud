import { createProductController } from '@src/application/use-cases/product/create-product'
import { adaptRoute } from '@src/utils/express-router.adapter'
import { Router } from 'express'
import multer from 'multer'

const router = Router()

const uploader = multer({ storage: multer.memoryStorage() })

router.post('/', uploader.single('file'), adaptRoute(createProductController))

export { router }

import { CreateProduct } from '@src/application/use-cases/product/create-product/create-product'
import { CreateProductController } from '@src/application/use-cases/product/create-product/create-product.controller'

const createProduct = new CreateProduct()
const createProductController = new CreateProductController(createProduct)

export { createProductController }

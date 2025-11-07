import './utils/module.alias'
import express from 'express'
import dotenv from 'dotenv'
import { router } from './router'

dotenv.config()

const app = express()

app.use(express.json())
app.use('/products', router)

app.listen(process.env.APP_PORT, () => {
  console.log(`server running on port ${process.env.APP_PORT} 🚀`)
})

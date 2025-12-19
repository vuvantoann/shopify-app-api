import express from 'express'
import shopRoutes from './shop.route'

const app = express()

app.use(express.json())

app.use('/shop', shopRoutes)

export default app

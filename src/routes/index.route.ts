import express from 'express'
import shopRoutes from './shop.route'
import customizationRoutes from './customization.route'
import cors from 'cors'
import * as authMiddleware from '../middlewares/auth.middleware'
const app = express()

app.use(cors())
app.use(express.json())

app.use('/shop', shopRoutes)
app.use('/customization', authMiddleware.requireAuth, customizationRoutes)

export default app

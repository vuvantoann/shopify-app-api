import express from 'express'
import cors from 'cors'
import * as authMiddleware from '../middlewares/auth.middleware'
import shopRoutes from './shop.route'
import customizationRoutes from './customization.route'
import translationRoutes from './translation.route'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/shop', shopRoutes)
app.use('/customization', authMiddleware.requireAuth, customizationRoutes)
app.use('/translation', authMiddleware.requireAuth, translationRoutes)
export default app

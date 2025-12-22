import express from 'express'
import shopRoutes from './shop.route'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/shop', shopRoutes)

export default app

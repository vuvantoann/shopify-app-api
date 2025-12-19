import express from 'express'
import { AppDataSource } from './data-source'
import { Shop } from './entity/Shop'
// import { Customization } from './entity/Customization'
// import { Translation } from './entity/Translation'

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

AppDataSource.initialize().then(() => {
  console.log('Database connected')
  const ShopRepo = AppDataSource.getRepository(Shop)

  app.post('/shop', async (req, res) => {
    const shop = ShopRepo.create(req.body)
    const result = await ShopRepo.save(shop)
    res.json(result)
  })

  app.get('/shop', async (_req, res) => {
    const shop = await ShopRepo.find()
    res.json(shop)
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

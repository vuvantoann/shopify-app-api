import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Shop } from '../entity/Shop'

const shopRepository = AppDataSource.getRepository(Shop)

export const createShop = async (req: Request, res: Response) => {
  try {
    const shop = shopRepository.create(req.body)
    const result = await shopRepository.save(shop)
    res.status(201).json(result)
  } catch (error) {
    res.status(500).json({ message: 'Create shop failed', error })
  }
}

export const getShops = async (_req: Request, res: Response) => {
  try {
    const shops = await shopRepository.find()
    res.json(shops)
  } catch (error) {
    res.status(500).json({ message: 'Get shops failed', error })
  }
}

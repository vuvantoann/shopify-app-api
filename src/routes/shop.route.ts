import { Router } from 'express'
import { createShop, getShops } from '../controllers/shop.controller'

const router = Router()

router.post('/', createShop)
router.get('/', getShops)

export default router

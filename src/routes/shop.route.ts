import { Router } from 'express'
import { createShop, getShops, loginShop } from '../controllers/shop.controller'

const router = Router()

router.get('/', getShops)
router.post('/create', createShop)
router.post('/login', loginShop)

export default router

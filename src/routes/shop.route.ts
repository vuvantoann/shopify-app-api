import { Router } from 'express'
import {
  createShop,
  getShopInfo,
  loginShop,
} from '../controllers/shop.controller'

const router = Router()
import * as authMiddleware from '../middlewares/auth.middleware'

router.post('/create', createShop)
router.post('/login', loginShop)
router.get('/detail', authMiddleware.requireAuth, getShopInfo)

export default router

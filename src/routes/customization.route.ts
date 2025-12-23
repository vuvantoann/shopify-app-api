import { Router } from 'express'
import {
  getCustomization,
  saveCustomization,
} from '../controllers/customization.controller'

const router = Router()

router.get('/', getCustomization)
router.put('/', saveCustomization)

export default router

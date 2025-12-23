import { Router } from 'express'
import {
  getTranslations,
  createTranslation,
  updateTranslation,
  deleteTranslation,
} from '../controllers/translation.controller'

const router = Router()

// Lấy toàn bộ bản dịch của shop
router.get('/', getTranslations)

// Tạo ngôn ngữ mới
router.post('/', createTranslation)

// Cập nhật bản dịch theo locale
router.post('/update', updateTranslation)
// (cố tình tách path để tránh nhầm với POST create)

// Xóa bản dịch theo locale
router.delete('/:locale', deleteTranslation)

export default router

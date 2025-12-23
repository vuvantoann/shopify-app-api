import { Response } from 'express'
import { AuthRequest } from '../types/auth-request'
import { AppDataSource } from '../data-source'
import { Translation } from '../entity/Translation'

const translationRepository = AppDataSource.getRepository(Translation)

// DEFAULT TRANSLATION

const DEFAULT_TRANSLATE = {
  'Discount box placeholder text': 'Discount code',
  'Button text': 'Apply',
}

// [GET] /translation
// Lấy toàn bộ bản dịch của shop

export const getTranslations = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    const translations = await translationRepository.find({
      where: { shop_id: shop.id },
      order: { created_at: 'ASC' },
    })

    return res.json({
      code: 200,
      message: 'Lấy danh sách bản dịch thành công',
      data: translations,
    })
  } catch (error) {
    console.error('Get translations error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Get translations failed',
    })
  }
}

// [POST] /translation
// Thêm ngôn ngữ mới (chỉ cần locale)

export const createTranslation = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop
    const { locale } = req.body

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    if (!locale) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu locale',
      })
    }

    // Check tồn tại
    const existed = await translationRepository.findOne({
      where: {
        shop_id: shop.id,
        locale,
      },
    })

    if (existed) {
      return res.status(400).json({
        code: 400,
        message: 'Ngôn ngữ này đã tồn tại',
      })
    }

    // Tạo bản dịch mới với translate mặc định
    const translation = translationRepository.create({
      shop_id: shop.id,
      locale,
      translate: DEFAULT_TRANSLATE,
    })

    await translationRepository.save(translation)

    return res.status(201).json({
      code: 200,
      message: 'Tạo ngôn ngữ mới thành công',
      data: translation,
    })
  } catch (error) {
    console.error('Create translation error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Create translation failed',
    })
  }
}

// [POST] /translations
// Update bản dịch theo locale

export const updateTranslation = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop
    const { locale, translate } = req.body

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    if (!locale || !translate) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu locale hoặc translate',
      })
    }

    const translation = await translationRepository.findOne({
      where: {
        shop_id: shop.id,
        locale,
      },
    })

    if (!translation) {
      return res.status(404).json({
        code: 404,
        message: 'Không tìm thấy bản dịch',
      })
    }

    translation.translate = translate
    await translationRepository.save(translation)

    return res.json({
      code: 200,
      message: 'Cập nhật bản dịch thành công',
      data: translation,
    })
  } catch (error) {
    console.error('Update translation error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Update translation failed',
    })
  }
}

// [DELETE] /translation/:locale
// Xóa bản dịch theo locale
export const deleteTranslation = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop
    const { locale } = req.params

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    const translation = await translationRepository.findOne({
      where: {
        shop_id: shop.id,
        locale,
      },
    })

    if (!translation) {
      return res.status(404).json({
        code: 404,
        message: 'Không tìm thấy bản dịch',
      })
    }

    await translationRepository.remove(translation)

    return res.json({
      code: 200,
      message: 'Xóa bản dịch thành công',
    })
  } catch (error) {
    console.error('Delete translation error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Delete translation failed',
    })
  }
}

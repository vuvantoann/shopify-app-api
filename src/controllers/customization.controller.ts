import { Response } from 'express'
import { AuthRequest } from '../types/auth-request'
import { AppDataSource } from '../data-source'
import { Customization } from '../entity/Customization'
import { DeepPartial } from 'typeorm'

const customizationRepository = AppDataSource.getRepository(Customization)

// [GET] /customization
export const getCustomization = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    // 👉 Mongo-style: query trực tiếp bằng shop_id
    let customization = await customizationRepository.findOne({
      where: { shop_id: shop.id },
    })

    // 👉 Nếu chưa có thì tạo default
    if (!customization) {
      customization = customizationRepository.create({
        shop_id: shop.id,
        input_width: 25,
        input_height: 25,
        input_border: 'solid',
        input_border_radius: 0,
        input_background_color: '#FFFFFF',
        border_color: '#000000',
        border_width: 1,
        button_width: 25,
        button_height: 25,
        button_border: 'solid',
        button_background_color: '#000000',
        button_text_color: '#FFFFFF',
        button_variant: 'plain',
        direction: 'vertical',
        css: '',
      })

      await customizationRepository.save(customization)
    }

    return res.json({
      code: 200,
      message: 'Lấy customization thành công',
      data: customization,
    })
  } catch (error) {
    console.error('Get customization error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Get customization failed',
    })
  }
}

// [PUT] /customization
export const saveCustomization = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop
    const body: DeepPartial<Customization> = req.body

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    let customization = await customizationRepository.findOne({
      where: { shop_id: shop.id },
    })

    if (!customization) {
      customization = customizationRepository.create({
        ...body,
        shop_id: shop.id,
      })
    } else {
      customizationRepository.merge(customization, body)
    }

    await customizationRepository.save(customization)

    return res.json({
      code: 200,
      message: 'Lưu customization thành công',
      data: customization,
    })
  } catch (error) {
    console.error('Save customization error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Save customization failed',
    })
  }
}

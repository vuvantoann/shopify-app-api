import { Request, Response } from 'express'
import { AuthRequest } from '../types/auth-request'

import { AppDataSource } from '../data-source'
import { Shop } from '../entity/Shop'

const shopRepository = AppDataSource.getRepository(Shop)
export const createShop = async (req: Request, res: Response) => {
  try {
    const { shopify_domain, shop_owner } = req.body

    // 1. Validate
    if (!shopify_domain || !shop_owner) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu thông tin shop',
      })
    }

    // 2. Check tồn tại
    const shopExist = await shopRepository.findOne({
      where: { shopify_domain },
    })

    if (shopExist) {
      return res.status(400).json({
        code: 400,
        message: 'Shop đã tồn tại',
      })
    }

    // 3. Tạo shop
    const newShop = shopRepository.create({
      shopify_domain,
      shop_owner,
    })

    await shopRepository.save(newShop)

    // 4. Trả token = shopify_domain
    return res.status(201).json({
      code: 200,
      message: 'Đăng ký shop thành công',
      token: shopify_domain,
    })
  } catch (error) {
    console.error('Create shop error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Create shop failed',
    })
  }
}

export const loginShop = async (req: Request, res: Response) => {
  try {
    const { shopify_domain } = req.body

    if (!shopify_domain) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu shopify_domain',
      })
    }

    const shop = await shopRepository.findOne({
      where: { shopify_domain },
    })

    if (!shop) {
      return res.status(400).json({
        code: 400,
        message: 'Shop không tồn tại',
      })
    }

    return res.json({
      code: 200,
      message: 'Đăng nhập shop thành công',
      token: shopify_domain,
    })
  } catch (error) {
    console.error('Login shop error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Login shop failed',
    })
  }
}

export const getShopInfo = async (req: AuthRequest, res: Response) => {
  try {
    const shop = req.shop

    if (!shop) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }

    return res.json({
      code: 200,
      message: 'Lấy thông tin shop thành công',
      data: {
        id: shop.id,
        shopify_domain: shop.shopify_domain,
        shop_owner: shop.shop_owner,
        created_at: shop.created_at,
        updated_at: shop.updated_at,
      },
    })
  } catch (error) {
    console.error('Get shop info error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Get shop info failed',
    })
  }
}

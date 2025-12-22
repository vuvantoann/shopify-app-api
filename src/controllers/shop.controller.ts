import { Request, Response } from 'express'
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

    // 2. Check shop đã tồn tại chưa
    const shopExist = await shopRepository.findOne({
      where: { shopify_domain },
    })

    if (shopExist) {
      return res.status(400).json({
        code: 400,
        message: 'Shop đã tồn tại',
      })
    }

    // 3. Tạo shop mới
    const newShop = shopRepository.create({
      shopify_domain,
      shop_owner,
    })

    await shopRepository.save(newShop)

    // 4. Response
    return res.status(201).json({
      code: 200,
      message: 'Đăng ký shop thành công',
      shop: newShop,
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

    // 1. Validate
    if (!shopify_domain) {
      return res.status(400).json({
        code: 400,
        message: 'Thiếu shopify_domain',
      })
    }

    // 2. Tìm shop
    const shop = await shopRepository.findOne({
      where: { shopify_domain },
    })

    if (!shop) {
      return res.status(400).json({
        code: 400,
        message: 'Shop không tồn tại',
      })
    }

    // 4. Set cookie (đóng vai trò session)
    res.cookie('shopify_domain', shop.shopify_domain, {
      httpOnly: true,
    })

    return res.json({
      code: 200,
      message: 'Đăng nhập shop thành công',
      shop: {
        id: shop.id,
        shopify_domain: shop.shopify_domain,
        shop_owner: shop.shop_owner,
      },
    })
  } catch (error) {
    console.error('Login shop error:', error)
    return res.status(500).json({
      code: 500,
      message: 'Login shop failed',
    })
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

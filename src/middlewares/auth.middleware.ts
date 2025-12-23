import { Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { Shop } from '../entity/Shop'
import { AuthRequest } from '../types/auth-request'

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        code: 401,
        message: 'Bạn cần đăng nhập',
      })
      return
    }

    const token = authHeader.split(' ')[1]

    const shopRepository = AppDataSource.getRepository(Shop)
    const shop = await shopRepository.findOne({
      where: { shopify_domain: token },
    })

    if (!shop) {
      res.status(401).json({
        code: 401,
        message: 'Token không hợp lệ',
      })
      return
    }

    // ✅ GIỜ THÌ OK
    req.shop = shop

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      code: 500,
      message: 'Lỗi xác thực',
    })
  }
}

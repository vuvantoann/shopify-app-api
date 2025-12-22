import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { Shop } from '../entity/Shop'

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(400).json({
        code: 400,
        message: 'Bạn cần gửi kèm token',
      })
      return
    }

    const token = authHeader.split(' ')[1] // Bearer xxx

    if (!token) {
      res.status(400).json({
        code: 400,
        message: 'Token không hợp lệ',
      })
      return
    }

    const shopRepository = AppDataSource.getRepository(Shop)

    const shop = await shopRepository.findOne({
      where: { shopify_domain: token },
    })

    if (!shop) {
      res.status(400).json({
        code: 400,
        message: 'Shop không tồn tại hoặc token sai',
      })
      return
    }

    // Gắn shop vào request
    ;(req as any).shop = shop

    next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      code: 500,
      message: 'Lỗi xác thực',
    })
  }
}

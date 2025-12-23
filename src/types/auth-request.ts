import { Request } from 'express'
import { Shop } from '../entity/Shop'

export interface AuthRequest extends Request {
  shop?: Shop
}

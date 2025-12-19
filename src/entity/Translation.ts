import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Shop } from './Shop'

@Entity()
export class Translation {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  shop_id: number

  @Column({ type: 'varchar', length: 10 })
  locale: string

  @Column({ type: 'json' })
  translate: object

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Quan hệ nhiều-1 với Shop
  @ManyToOne(() => Shop, (shop) => shop.translations)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop
}

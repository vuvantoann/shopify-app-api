import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255, unique: true })
  shopify_domain: string

  @Column({ type: 'varchar', length: 255 })
  shop_owner: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

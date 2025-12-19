import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { Customization } from './Customization'
import { Translation } from './Translation'

@Entity()
export class Shop {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number

  @Column({ type: 'varchar', length: 255, unique: true })
  shopify_domain: string

  @Column({ type: 'varchar', length: 255 })
  shop_owner: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Quan hệ 1-1 với Customization
  @OneToOne(() => Customization, (customization) => customization.shop)
  customization: Customization

  // Quan hệ 1-nhiều với Translation
  @OneToMany(() => Translation, (translation) => translation.shop)
  translations: Translation[] | undefined
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Shop } from './Shop'

@Entity()
export class Customization {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', unique: true })
  shop_id: number

  @Column({ type: 'int' })
  input_width: number

  @Column({ type: 'int' })
  input_height: number

  @Column({ type: 'varchar', length: 50 })
  input_border: string

  @Column({ type: 'int' })
  input_border_radius: number

  @Column({ type: 'varchar', length: 50 })
  input_background_color: string

  @Column({ type: 'varchar', length: 50 })
  button_variant: string

  @Column({ type: 'int' })
  border_width: number

  @Column({ type: 'varchar', length: 50 })
  border_color: string

  @Column({ type: 'int' })
  button_width: number

  @Column({ type: 'int' })
  button_height: number

  @Column({ type: 'varchar', length: 50 })
  button_border: string

  @Column({ type: 'varchar', length: 50 })
  button_background_color: string

  @Column({ type: 'varchar', length: 50 })
  button_text_color: string

  @Column({ type: 'varchar', length: 50 })
  direction: string

  @Column({ type: 'longtext' })
  css: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  // Quan hệ 1-1 với Shop
  @OneToOne(() => Shop, (shop) => shop.customization)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop
}

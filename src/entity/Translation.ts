import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

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
}

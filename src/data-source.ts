import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Shop } from './entity/Shop'
// import { Customization } from './entity/Customization'
// import { Translation } from './entity/Translation'
import * as dotenv from 'dotenv'

dotenv.config() // ← Load biến môi trường

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Shop],
  synchronize: false,
  logging: true,
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations',
})

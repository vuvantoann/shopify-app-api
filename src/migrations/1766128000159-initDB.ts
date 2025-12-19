import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InitDB1766128000159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tạo bảng shop
    await queryRunner.createTable(
      new Table({
        name: 'shop',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'shopify_domain',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'shop_owner',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('shop')
  }
}

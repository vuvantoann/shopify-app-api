import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

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
    // Tạo bảng customization
    await queryRunner.createTable(
      new Table({
        name: 'customization',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'shop_id',
            type: 'int',
            isUnique: true,
          },
          {
            name: 'input_width',
            type: 'int',
          },
          {
            name: 'input_height',
            type: 'int',
          },
          {
            name: 'input_border',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'input_border_radius',
            type: 'int',
          },
          {
            name: 'input_background_color',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'button_variant',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'border_width',
            type: 'int',
          },
          {
            name: 'border_color',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'button_width',
            type: 'int',
          },
          {
            name: 'button_height',
            type: 'int',
          },
          {
            name: 'button_border',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'button_background_color',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'button_text_color',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'direction',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'css',
            type: 'longtext',
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

    // Tạo foreign key cho customization
    await queryRunner.createForeignKey(
      'customization',
      new TableForeignKey({
        columnNames: ['shop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shop',
        onDelete: 'CASCADE',
      })
    )

    // Tạo bảng translation
    await queryRunner.createTable(
      new Table({
        name: 'translation',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'shop_id',
            type: 'int',
          },
          {
            name: 'locale',
            type: 'varchar',
            length: '10',
          },
          {
            name: 'translate',
            type: 'json',
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

    // Tạo foreign key cho translation
    await queryRunner.createForeignKey(
      'translation',
      new TableForeignKey({
        columnNames: ['shop_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'shop',
        onDelete: 'CASCADE',
      })
    )

    // Tạo unique constraint cho (shop_id, locale) trong translation
    await queryRunner.query(
      'ALTER TABLE `translation` ADD UNIQUE INDEX `uk_shop_locale` (`shop_id`, `locale`)'
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop unique constraint
    await queryRunner.query('ALTER TABLE translation DROP INDEX uk_shop_locale')

    // Drop foreign keys trước
    const translationTable = await queryRunner.getTable('translation')
    const translationForeignKey = translationTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('shop_id') !== -1
    )
    if (translationForeignKey) {
      await queryRunner.dropForeignKey('translation', translationForeignKey)
    }

    const customizationTable = await queryRunner.getTable('customization')
    const customizationForeignKey = customizationTable?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('shop_id') !== -1
    )
    if (customizationForeignKey) {
      await queryRunner.dropForeignKey('customization', customizationForeignKey)
    }

    // Drop tables - THỨ TỰ ĐÚNG
    await queryRunner.dropTable('translation')
    await queryRunner.dropTable('customization')
    await queryRunner.dropTable('shop')
  }
}

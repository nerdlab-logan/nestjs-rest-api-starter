import { CreateDateColumn, UpdateDateColumn } from 'typeorm'

export class DateEmbeddedEntity {
  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date
}

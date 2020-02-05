import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { DateEmbeddedEntity } from '../embedded/dateEmbeddedEntity'

export abstract class AccountAbstractEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column('char', { length: 60 })
  password: string

  @Column({ length: 64 })
  name: string

  @Column('datetime', { name: 'signin_at', nullable: true })
  signInAt: Date

  @Column(type => DateEmbeddedEntity, { prefix: false })
  date: DateEmbeddedEntity
}

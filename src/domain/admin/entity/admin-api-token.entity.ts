import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AdminEntity } from './admin.entity'

@Entity('admin_api_token')
export class AdminApiTokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('bigint', { name: 'admin_id' })
  adminId: number

  @Column('text', { name: 'access_token' })
  accessToken: string

  @Column('text', { name: 'refresh_token' })
  refreshToken: string

  @Column('datetime', { name: 'access_token_expired_datetime', nullable: true })
  accessTokenExpiredDatetime: Date

  @Column('datetime', { name: 'refresh_token_expired_datetime', nullable: true })
  refreshTokenExpiredDatetime: Date

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date

  @ManyToOne(type => AdminEntity, { eager: true })
  @JoinColumn({ name: 'admin_id', referencedColumnName: 'id' })
  admin: AdminEntity
}

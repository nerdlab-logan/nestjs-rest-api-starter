import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('user_api_token')
export class UserApiTokenEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('bigint', { name: 'user_id' })
  userId: number

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

  @ManyToOne(type => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity
}

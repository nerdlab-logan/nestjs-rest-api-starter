import { BeforeInsert, Column, Entity } from 'typeorm'
import { AccountAbstractEntity } from '../../../global/entity/abstracts/account.abstract.entity'
import * as bcrypt from 'bcrypt'
import { UserRO } from '../ro/user.ro'

@Entity('user')
export class UserEntity extends AccountAbstractEntity {
  @Column({ name: 'nick_name', length: 60, unique: true })
  nickName: string

  @Column({ name: 'memo', nullable: true })
  memo: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  async comparePassword(attempt: string): Promise<string> {
    return await bcrypt.compare(attempt, this.password)
  }

  public toResponseObject(): UserRO {
    const { id, email, name, nickName, memo, signInAt } = this
    return new UserRO(id, email, name, nickName, memo, signInAt, this.date.createdAt, this.date.updatedAt)
  }
}

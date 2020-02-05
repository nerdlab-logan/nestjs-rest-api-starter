import { BeforeInsert, Entity } from 'typeorm'
import { AccountAbstractEntity } from '../../../global/entity/abstracts/account.abstract.entity'
import * as bcrypt from 'bcrypt'
import { AdminRO } from '../ro/admin.ro'

@Entity('admin')
export class AdminEntity extends AccountAbstractEntity {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12)
  }

  async comparePassword(attempt: string): Promise<string> {
    return await bcrypt.compare(attempt, this.password)
  }

  public toResponseObject(): AdminRO {
    const { id, email, name, signInAt } = this
    return new AdminRO(id, email, name, signInAt, this.date.createdAt, this.date.updatedAt)
  }
}

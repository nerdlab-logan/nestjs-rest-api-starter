import { EntityRepository, Repository } from 'typeorm'
import { AdminEntity } from '../entity/admin.entity'

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {}

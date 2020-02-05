import { EntityRepository, Repository } from 'typeorm'
import { AdminApiTokenEntity } from '../entity/admin-api-token.entity'

@EntityRepository(AdminApiTokenEntity)
export class AdminApiTokenRepository extends Repository<AdminApiTokenEntity> {}

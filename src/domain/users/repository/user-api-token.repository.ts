import { EntityRepository, Repository } from 'typeorm'
import { UserApiTokenEntity } from '../entity/user-api-token.entity'

@EntityRepository(UserApiTokenEntity)
export class UserApiTokenRepository extends Repository<UserApiTokenEntity> {}

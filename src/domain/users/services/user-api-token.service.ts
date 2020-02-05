import { Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { JwtTokenService } from '../../auth/services/jwt-token.service'
import { UserEntity } from '../entity/user.entity'
import { UserApiTokenEntity } from '../entity/user-api-token.entity'

@Injectable()
export class UserApiTokenService {
  constructor(private readonly userEntityManager: EntityManager, private readonly jwtTokenService: JwtTokenService) {}

  public async createApiToken(
    user: UserEntity,
    accessToken: string,
    refreshToken: string,
    entityManager: EntityManager = this.userEntityManager,
  ): Promise<UserApiTokenEntity> {
    const accessTokenPayload = await this.jwtTokenService.verifyAccessToken(accessToken)
    const refreshTokenPayload = await this.jwtTokenService.verifyRefreshToken(refreshToken)

    const newApiToken = new UserApiTokenEntity()
    newApiToken.user = user
    newApiToken.accessToken = accessToken
    newApiToken.accessTokenExpiredDatetime = new Date(accessTokenPayload.exp * 1000)
    newApiToken.refreshToken = refreshToken
    newApiToken.refreshTokenExpiredDatetime = new Date(refreshTokenPayload.exp * 1000)

    return await entityManager.save(newApiToken)
  }
}
